import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Screen } from "../components/Screen";
import { useQueryClient } from "react-query";
import { EditApartment } from "../types/apartment";
import { Formik } from "formik";
import { View, StyleSheet } from "react-native";
import { bedValues } from "../constants/bedValues";
import { bathValues } from "../constants/bathValues";
import { ManageUnitsCard } from "../components/ManageUnitsCard";
import { Button, Divider } from "@ui-kitten/components";
import { theme } from "../theme";
import * as yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { useLoading } from "../hooks/useLoading";
import { PickerItem } from "react-native-woodpicker";
import { useApartmentsQuery } from "../hooks/queries/useApartmentsQuery";
import { useEditApartmentsMutation } from "../hooks/mutations/useEditApartmentsMutation";

export const ManageUnitsScreen = ({
  route,
}: {
  route: { params: { propertyID: number } };
}) => {
  //Query to get all properties with the associated ID
  const apartments = useApartmentsQuery(route.params.propertyID);

  const editApartments = useEditApartmentsMutation();

  //Initial values  for the Formik Component
  const apartmentsData = apartments.data; // from the apartments Query
  const initialApartments: EditApartment[] = [];
  //if apartmentsData exist we loop through all the apartments
  if (apartmentsData) {
    for (let i of apartmentsData) {
      initialApartments.push({
        ID: i.ID,
        unit: i.unit,
        bedrooms: bedValues.filter((item) => item.value === i.bedrooms)[0],
        bathrooms: bathValues.filter((item) => item.value === i.bathrooms)[0],
        sqFt: i.sqFt ? i.sqFt.toString() : "",
        active: i.active,
        editName: i.unit ? false : true,
        availableOn: new Date(i.availableOn),
      });
    }
  }

  return (
    <KeyboardAwareScrollView bounces={false}>
      <Screen>
        <Formik
          validationSchema={validationSchema}
          initialValues={{ apartments: initialApartments }}
          enableReinitialize
          onSubmit={(values) => {
            for (let i of values.apartments) {
              i.bedrooms = (i.bedrooms as PickerItem).value;
              i.bathrooms = (i.bathrooms as PickerItem).value;
              i.sqFt = Number(i.sqFt);
            }
            editApartments.mutate({
              obj: values.apartments,
              propertyID: route.params.propertyID,
            });
          }}
        >
          {({
            values,
            errors,
            touched,
            handleSubmit,
            setFieldTouched,
            setFieldValue,
            handleChange,
          }) => {
            const addUnit = () => {
              //deep copying the apartments
              const newApartments = [...values.apartments];

              //push new edited apartment object into the newApartments array.
              newApartments.push({
                active: true,
                bedrooms: bedValues[0],
                bathrooms: bathValues[0],
                editName: true,
                sqFt: "",
                unit: "",
                availableOn: new Date(),
              });
              //setting the fieldvalue to the new apartments
              setFieldValue("apartments", newApartments);
            };

            //filter anything but the passed in index
            const removeUnit = (index: number) => {
              const newApartments = values.apartments.filter(
                (_, idx) => idx !== index
              );

              setFieldValue("apartments", newApartments);
            };

            return (
              <View>
                {values.apartments?.map((apartment, index) => (
                  <ManageUnitsCard
                    apartment={apartment}
                    key={index}
                    removable={
                      apartmentsData && index > apartmentsData.length - 1
                        ? true
                        : false
                    }
                    index={index}
                    errors={errors}
                    touched={touched}
                    removeUnit={removeUnit}
                    setFieldValue={setFieldValue}
                    handleChange={handleChange}
                    setFieldTouched={setFieldValue}
                  />
                ))}
                <>
                  <Button
                    onPress={addUnit}
                    appearance="ghost"
                    status="info"
                    style={styles.addUnitButton}
                  >
                    Add Unit
                  </Button>
                  <Divider style={styles.divider} />
                </>
                <Button
                  style={styles.saveButton}
                  onPress={() => handleSubmit()}
                  disabled={values.apartments.length === 0 ? true : false}
                >
                  Save Updates
                </Button>
              </View>
            );
          }}
        </Formik>
      </Screen>
    </KeyboardAwareScrollView>
  );
};

const validationSchema = yup.object().shape({
  apartments: yup.array(
    yup.object().shape({
      unit: yup.string().required("Required"),
      bedrooms: yup.object().shape({
        label: yup.string().required("Required"),
        value: yup.string().required("Required"),
      }),
      bathrooms: yup.object().shape({
        label: yup.string().required("Required"),
        value: yup.string().required("Required"),
      }),
      sqFt: yup.string().required("Required"),
      active: yup.bool().required(),
      editName: yup.bool(),
      availableOn: yup.date().required(),
    })
  ),
});

const styles = StyleSheet.create({
  addUnitButton: {
    alignSelf: "flex-start",
    marginVertical: 10,
  },
  divider: {
    backgroundColor: theme["color-gray"],
    width: "100%",
  },
  saveButton: {
    marginHorizontal: 10,
    marginTop: 20,
  },
});
