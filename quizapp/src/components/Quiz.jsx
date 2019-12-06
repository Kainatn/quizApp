import React, { Component } from 'react';
import { QuizData } from './QuizData';
import './Quiz.css';
import { Layout, Button, Typography, Modal } from 'antd';
const { Header, Content } = Layout;
const { Title } = Typography;
export class Quiz extends Component {

    state = {
        userAnswer: null,
        currentQuestion: 0,
        options: [],
        score: 0,
        quizDisable: true,
        quizEnd: false,
        visible: false

    }
    // Load Quiz
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
    //Score
    nextQuestionHandler = () => {


        this.setState({
            currentQuestion: this.state.currentQuestion + 1
        })
        console.log(this.state.answers);
        this.increaseScore();
        console.log(this.state.score);

    }
    increaseScore = () => {
        let { answers, userAnswer, score } = this.state;
        if (userAnswer === answers) {
            this.setState({
        
                score: score + 1
            })
        }
    }
    // Update Questions
    componentDidUpdate(preProps, prevState) {
        const { currentQuestion } = this.state;
        if (this.state.currentQuestion !== prevState.currentQuestion) {
            this.setState(() => {

                return {
                    disabled: true,
                    questions: QuizData[currentQuestion].question,
                    options: QuizData[currentQuestion].option,
                    answers: QuizData[currentQuestion].answer,

                }
            })
        }
    }
    //Check Answer
    checkAnswer = answers => {
        this.setState({
            userAnswer: answers,
            quizDisable: false,
        })
    }
    finishHandler = () => {
        if (this.state.currentQuestion === QuizData.length - 1) {
            this.setState({
                quizEnd: true
            })
        }
    }
    //POPUP Window
    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,

        });
        window.location.reload();

    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };
    //Ended
    render() {

        const { questions, options, currentQuestion, userAnswer, quizEnd, score } = this.state;
        // if (quizEnd) {
        //     return (
        //         <>
        //             <Title level={4}> Quiz End</Title><p> {this.state.score}</p>
        //         </>

        //     )
        // }
        return (
            <div>
                <Layout>
                    <Header><img src={require('./../images/quiz.png')} alt="logo" className="logo"></img></Header>
                    <Content>
                        <Title level={4}> {questions}</Title><span>Questions   {currentQuestion + 1} out of {QuizData.length}</span>
                        {options.map((option) =>
                            <Button onClick={() => this.checkAnswer(option)} block size="large" className={`option 
                          ${userAnswer === option ? "option" : null}
                          `}>{option}</Button>
                        )}
                        {currentQuestion < QuizData.length - 1 &&
                            <Button type="primary" onClick={this.nextQuestionHandler} disabled={this.state.quizDisable} >Submit</Button>
                        }
                        {currentQuestion === QuizData.length - 1 && <Button type="primary" onClick={this.finishHandler} onClick={this.showModal} >Finish</Button>}

                        <Modal
                            title="You Score "
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                        >
                            <p> {this.state.score}</p>
                        </Modal>
                    </Content>


                </Layout>
            </div>

        );
    }
}

export default Quiz;
