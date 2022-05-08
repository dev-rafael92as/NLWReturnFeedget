import { ChatTeardropDots } from 'phosphor-react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import BottomSheet from '@gorhm/bottom-sheet'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'

import { Form } from '../Form';
import { Success } from '../Success';
import { Options } from '../Options';

import { styles } from './styles';
import { useRef } from 'react';
import { feedbackTypes } from '../../utils/feedbackTypes';

export type feedbackType = keyof typeof feedbackTypes

function Widget() {

    const bottomSheetRef = useRef<BottomSheet>(null);

    function handleOpen() {
        bottomSheetRef.current?.expand();
    }

  return (
    <>
        <TouchableOpacity
            style={styles.button}
            onPress={handleOpen}    
        >

            <ChatTeardropDots
                size={24}
                weight="bold"
                color={theme.colors.text_on_brand_color} 
            />
        </TouchableOpacity>

        <BottomSheet
            ref={bottomSheetRef}
            snapPoints={[1, 280]}
            backgroundStyle={styles.modal}
            handleIndicatorStyle={styles.indicator}
        >
            <Form 
                feedbackType='BUG'
            />
        </BottomSheet>
    </>
  );
}

export default gestureHandlerRootHOC(Widget);