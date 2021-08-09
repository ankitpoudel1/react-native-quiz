import { StatusBar } from 'expo-status-bar';
import React,{useEffect, useState} from 'react';
import { StyleSheet, Button,Text, View } from 'react-native';
import QuizBody from './components/QuizBody';
import AnswerOption from './components/AnswerOption';
import loadingGif from './assets/giphy.webp'
export default function App() {

  const [questions,setQuestions] = useState([]);
  const [category,setCategory] = useState(null);
  const [difficulty,setDifficulty] = useState(null);
  const [currentPage,setCurrentPage] = useState('category-select');
  const [currentQuestion,setCurrentQuestion] = useState(0);
  // const [quizLoaded,setQuizLoaded] = useState(false);
  const [questionAnswered,setQuestionAnswered] = useState(false);
  const [correctlyAnswered,setCorrectlyAnswered] = useState(null);
  const [questionChanged,setQuestionChanged] = useState(false);
 
  
  let answers = [];
  let answersOptions = [];
  let isCorrectAnswer;

  async function fetchQuizzes(){ 
    const result = await fetch('https://opentdb.com/api.php?amount=10&category='+category+'&difficulty='+difficulty+'&type=multiple');
    const json = await result.json();
    setQuestions(json.results);
    // setQuizLoaded(true);
    setCurrentPage('quiz-page');
  };
  
  function changeCategory(catId){
    setCategory(catId);
    setCurrentPage('difficulty-select');

  }

  function changeDifficulty(difficulty){
    setDifficulty(difficulty);
    setCurrentPage('quiz-loading');
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function handleQuestionChange(){
    if (currentQuestion<10){
        setCurrentQuestion(currentQuestion+1);
        setQuestionChanged(true);
    }
}

  function renderAnswerRow(){

    answers = questions[currentQuestion]['incorrect_answers'];
    answers.push(questions[currentQuestion]['correct_answer']);

    
    shuffleArray(answers);
    shuffleArray(answers);

    Object.keys(answers).forEach(function(key, index) {
      isCorrectAnswer = false;

      if(answers[key]==questions[currentQuestion]['correct_answer']){
        isCorrectAnswer=true;
      };
   
      answersOptions.push(<AnswerOption key={key} answerKey={key} answer={this[key]} 
                      setQuestionAnswered={setQuestionAnswered} isCorrectAnswer={isCorrectAnswer}
                      setCorrectlyAnswered={setCorrectlyAnswered} correctlyAnswered={correctlyAnswered}
                      questionAnswered={questionAnswered} questionChanged={questionChanged}
      />);
      }, answers);
 

    console.log(answersOptions);

    return answersOptions;

   
  };
  

  useEffect(()=>{
    if (currentPage=='quiz-loading' && questions.length==0){
      fetchQuizzes();
    }

    if (questionChanged){
      setCorrectlyAnswered(false);
      setQuestionAnswered(false);
      setQuestionChanged(false);
  }
    // if (questions.length>0){
    //     renderAnswerRow();
    // }
  })

 if (currentPage == 'category-select'){

  return (
    <View style={styles.container}>
      <Text>Welcome to quiz</Text>
      <Text>Select Category</Text>
    <View>
    
    <View style={{padding:'1%'}}>
    <Button
        onPress={()=>changeCategory(21)}
        title="Sports"
        >
    </Button>
    </View> 
    
    <View style={{padding:'1%'}}>
    <Button
        onPress={()=>changeCategory(19)}
        title="General Knowledge">
    </Button>
    </View>

    <View style={{padding:'1%'}}>
    <Button
        onPress={()=>changeCategory(20)}
        title="Mythology">
    </Button>
    </View>

      <StatusBar style="auto" />
    </View>
    </View>

  );
  }
  
  else if (currentPage == 'difficulty-select') {
    return (<View style={styles.container}>
        <View><Text>Select Difficulty</Text></View>
       <View style={{padding:'1%'}}><Button title="easy" onPress={()=>changeDifficulty('easy')}/></View>
       <View style={{padding:'1%'}}><Button title="medium" onPress={()=>changeDifficulty('medium')}/></View> 
       <View style={{padding:'1%'}}><Button title="hard" onPress={()=>changeDifficulty('hard')}/></View> 
      </View>
    );
  }

  else if (currentPage == 'quiz-loading'){
    return (<View style={styles.container}>
      <Text>Loading...</Text>
      </View>);
  }

  else if (currentPage == 'quiz-page'){
    return(<View style={{
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
                  
                }}>{questions[currentQuestion]['question']}</Text>
            </View>
            <View style={{
                    height:'45%',
                    //  width:'50%',
                    //  backgroundColor:'#024',
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
    </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#ed3',
    backgroundColor: '#4a4a46',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuButton: {
    padding:'1%',
  },
});
