import React,{useState,useEffect} from 'react';
import { Button, View ,Text} from 'react-native';

export default function AnswerOption(props){

    const [buttonColor,setButtonColor] = useState('#250c6f');
    const [isCorrectAnswer] = useState(props.isCorrectAnswer);
    function checkCorrect(){
        if (isCorrectAnswer){
            setButtonColor('green');
        }
        else {
            setButtonColor('red');
        }
        // props.setQuestionAnswered(true);
    }

    useEffect( () => {
        if (isCorrectAnswer && props.questionAnswered){
            setButtonColor('green');
        }
        if (props.questionChanged){
            setButtonColor('#250c6f');
        }
    })
   

    return (<View style={{
        width:'80%',
        left:'10%',
        padding: '1%'
    }}>
        <Button title={props.answer}
        onPress={()=> checkCorrect()}
        color={buttonColor}
        />
    </View>)
}