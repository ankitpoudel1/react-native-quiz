import React,{useEffect, useState} from 'react';
import { Button, View ,Text} from 'react-native';
import AnswerOption from './AnswerOption';
export default function QuizBody(props){
    const [currentQuestion,setCurrentQuestion] = useState(0);
    // const [questionAnswered,setQuestionAnswered] = useState(false);
    const [questionChanged,setQuestionChanged] = useState(false);
    const question = props.questions[currentQuestion];
    let answers = [];
    let isCorrectAnswer = false;
    // console.log(Object.keys(question.answers).length);
    console.log(question);
    function renderAnswerRow(){
    Object.keys(question.answers).forEach(function(key, index) {
     if (this[key]){
         if (question['correct_answer']==key){
              isCorrectAnswer = true;
         }
     answers.push(<AnswerOption key={key} answerKey={key} answer={this[key]} correctAnswer={question['correct_answer']} 
                     questionAnswered={questionAnswered} questionChanged={questionChanged}
     />)}
         isCorrectAnswer = false;
      }, question.answers);

      return answers;
    }

    function handleQuestionChange(){
        if (currentQuestion<10){
            setCurrentQuestion(currentQuestion+1);
            setQuestionChanged(true);
        }
    }

    useEffect(()=>{
        if (questionChanged){
            setQuestionAnswered(false);
            setQuestionChanged(false);
        }
    })

    return (
        <View style={{
            height:'100%',
            width:'100%',
            backgroundColor:'#000',
        }}>
            <View style={{
                 height:'20%',
                //  width:'50%',
                //  backgroundColor:'#067',
                 color:"#fff",
                 alignItems: 'center',
                 justifyContent: 'center',
            }}
            
            >
                <Text style={{
                    color:'white',
                  
                }}>{question.question}</Text>
            </View>


            <View style={{
                    height:'45%',
                    //  width:'50%',
                     backgroundColor:'#024',
                     color:"#4a4",
                     margin: '4%',
                    //  border: '2px solid #fff',
            }}
            >
               
            
                {renderAnswerRow()}

                <View style={{
                    // position:'relative',
                    color:'white',
                    top:'60%',
                    left:'75%'
                }}>
                    <Text
                    onPress={()=>{handleQuestionChange()}}
                    style={{
                        color:'#fff'
                    }}
                    > Next >> </Text>
                </View>
                
            </View>
                

        </View>
    );
}