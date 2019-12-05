import React, { Component } from 'react';
import { QuizData } from './QuizData';
import './Quiz.css';
import { Layout, Button, Typography } from 'antd';
const { Header, Content } = Layout;
const { Title } = Typography;
export class Quiz extends Component {

    state = {
        userAnswer: null,
        currentQuestion: 0,
        options: []

    }

    loadQuiz = () => {
        const { currentQuestion } = this.state;
        this.setState(() => {
            return {
                questions: QuizData[currentQuestion].question,
                options: QuizData[currentQuestion].option,
                answers: QuizData[currentQuestion].answer,

            }
        })
    }

    componentDidMount() {
        this.loadQuiz();
    }
    nextQuestionHandler = () => {
        this.setState({
            currentQuestion: this.state.currentQuestion + 1
        })
        console.log(this.state.currentQuestion);
    }
    componentDidUpdate(preProps, prevState) {
        const { currentQuestion } = this.state;
        if (this.state.currentQuestion !== prevState.currentQuestion) {
            this.setState(() => {
                return {
                    questions: QuizData[currentQuestion].question,
                    options: QuizData[currentQuestion].option,
                    answers: QuizData[currentQuestion].answer,

                }
            })
        }
    }
checkAnswer = answer =>{
    this.setState({
        userAnswer:answer
    })
}
    render() {
        const { questions, options,currentQuestion,userAnswer } = this.state;
        return (
            <div>
                <Layout>
                    <Header><img src={require('./../images/quiz.png')} alt="logo" className="logo"></img></Header>
                    <Content>
        <Title level={4}> {questions}</Title><span>{'Questions '+ currentQuestion +' out of '+QuizData.length}</span>
                        {options.map((opt) => 
                          <Button onClick={ ()=> this.checkAnswer(opt)} block size="large"  className={`option 
                          ${userAnswer === opt ? "option" :null}
                          `}>{ opt}</Button>
                        )}
                        <Button type="primary" onClick={this.nextQuestionHandler} >Primary</Button>
                    </Content>


                </Layout>
            </div>

        );
    }
}

export default Quiz;
