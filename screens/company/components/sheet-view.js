import React, { useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import RBSheet from 'react-native-raw-bottom-sheet';
import { height } from '../../../constants/Layout';

const SheetView = ({ refRBSheet, handleSheetView, services }) => {
  const [activeService, setActiveService] = useState(null);

  const handleActiveService = (index) => {
    setActiveService(index);
  };

  return (
    <RBSheet
      ref={refRBSheet}
      onOpen={handleSheetView}
      onClose={handleSheetView}
      closeOnDragDown={true}
      closeOnPressMask={true}
      height={height * 0.5}
      customStyles={{
        draggableIcon: {
          backgroundColor: '#000',
        },
      }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Список услуг</Text>
        <ScrollView
          style={styles.scrollview}
          contentContainerStyle={styles.contentScrollview}
        >
          {services &&
            services.map((item, index) => {
              const { companyServiceID, companyServiceName } = item;
              return (
                <TouchableOpacity
                  key={companyServiceID}
                  onPress={() => handleActiveService(index)}
                >
                  <View style={styles.service}>
                    <Text>{companyServiceName}</Text>
                    <View style={styles.checkbox_outer}>
                      <View
                        style={[
                          styles.checkbox_inner,
                          {
                            backgroundColor:
                              activeService === index ? '#000' : '#fff',
                          },
                        ]}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
        </ScrollView>
        {activeService && (
          <TouchableOpacity style={styles.button_choose}>
            <Text style={styles.button_choose_text}>выбрать</Text>
          </TouchableOpacity>
        )}
      </View>
    </RBSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    paddingLeft: 20,
    paddingTop: 20,
  },
  scrollview: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  contentScrollview: {
    paddingBottom: 30,
  },
  service: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 30,
    borderColor: '#000',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 30,
  },
  checkbox_outer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkbox_inner: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  button_choose: {
    backgroundColor: '#000',
    marginBottom: 30,
    marginLeft: 20,
    marginRight: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  button_choose_text: {
    color: '#fff',
    textTransform: 'uppercase',
  },
});

export default SheetView;
