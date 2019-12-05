import React, { Component } from 'react';
import { QuizData } from './QuizData';
import './Quiz.css';
import { Layout, Button } from 'antd';

const { Header, Footer, Content } = Layout;
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
    render() {
        const { questions, options } = this.state;
        return (
            <div>
                <Layout>
                    <Header>Quiz </Header>
                    <Content>
                        {questions}
                        {options.map((opt) =>
                            <p>{opt}</p>
                        )}
                        <Button type="primary">Primary</Button>
                    </Content>


                    <Footer>Made by me....</Footer>
                </Layout>
            </div>

        );
    }
}

export default Quiz;
