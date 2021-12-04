import React from 'react';

import {
  Modal,
  View,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import { THEME } from '../theme';

interface ImageSourceModal {
  visibility: boolean;
  makePhoto: () => void;
  selectFromLibrary: () => void;
  closeModal: () => void;
}

export const ImageSourceModal: React.FC<ImageSourceModal> = props => {
  const { t } = useTranslation();

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.visibility}
      onRequestClose={() => props.closeModal()}>
      <TouchableWithoutFeedback onPress={() => props.closeModal()}>
        <View style={styles.wrapper}>
          <View style={styles.modalScreen}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.button}
              onPress={() => {
                props.makePhoto();
              }}>
              <Text style={styles.textStyle}>{t('imageSourceModal.makeNewPhoto')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.button}
              onPress={() => {
                props.selectFromLibrary();
              }}>
              <Text style={styles.textStyle}>{t('imageSourceModal.selectFromLibrary')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  modalScreen: {
    marginTop: 350,
    backgroundColor: THEME.WHITE_COLOR,
    width: '90%',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: THEME.BLACK_COLOR,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 15,
    padding: 10,
    width: '90%',
    elevation: 2,
    marginBottom: 10,
    backgroundColor: THEME.MAIN_COLOR,
  },

  textStyle: {
    color: THEME.WHITE_COLOR,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
