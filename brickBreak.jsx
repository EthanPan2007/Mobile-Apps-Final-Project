import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, Image, TextInput, ImageBackground, TouchableHighlight, Alert, Dimensions, ScrollView } from 'react-native';
import Constants from 'expo-constants';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

export default class App extends Component {
    state = {
        titleScreen: 'block',
        gameScreen: 'none',
        shape: '',
        grid: [
            ['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'],
            ['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'],
            ['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'],
            ['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'],
            ['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'],
            ['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'],
            ['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'],
            ['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'],
        ],
        curRow: -1,
        curCol: -1,
        gameOverScreen: 'none',
        highScoresScreen: 'none',
        score: 0,
        finalScore: 0,
        records: [],
    }
    
    updateShape = (Shape) => {
        this.setState({
            shape: Shape
        })
    };
    
    updateScore = (amount) => {
        this.setState({
            score: this.state.score + amount
        })
    };
    
    updateRecords = (Score) => {
        this.setState({
            score: 0
        })
        
        this.state.records.splice(this.state.records.length, 0, {
            finalScore: Score
        })
    };
    
    //changColor = 
    
    handleGameScreenPress = () => this.setState(state=> ({
        titleScreen: 'none',
        gameScreen: 'block',
        gameOverScreen: 'none',
        highScoresScreen: 'none',
    }));
    
    handleGameOverScreenPress = () => this.setState(state=> ({
        titleScreen: 'none',
        gameScreen: 'none',
        gameOverScreen: 'block',
        highScoresScreen: 'none',
    }));
    
    handleHighScoresScreenPress = () => this.setState(state=> ({
        titleScreen: 'none',
        gameScreen: 'none',
        gameOverScreen: 'none',
        highScoresScreen: 'block',
    }));
    
    handleGridSquarePress = (ROW, COL) => {
        if (this.state.shape == 'L' || this.state.shape == 'square') {
            this.updateScore(4)
        }
        
        
    };
    
    
    render() {
        return (
            <View style={styles.container}>
                <View style={{display: this.state.titleScreen}}>
                <View style={styles.content}>
                    <Text style={styles.titleText}>
                        BRICK BREAK
                    </Text>
                
                    <TouchableHighlight style={styles.startButton}
                        onPress={this.handleGameScreenPress}
                    >
                        <Text style={styles.startButtonText}>
                            START
                        </Text>
                    </TouchableHighlight>
                </View>
                </View>
                
                <View style={{display: this.state.gameScreen}}>
                    <View style={styles.content}>
                        <Text style={styles.scoreText}>
                            {this.state.score}
                        </Text>
                    
                        <View style={styles.gridContainer}>
                            {this.state.grid.map((row, rowIndex) => (
                                <View key={rowIndex} style={styles.row}>
                                    {row.map((item, colIndex) => (
                                        <TouchableHighlight key={colIndex} style={styles.gridSquareB}
                                            onPress={() => this.handleGridSquarePress(rowIndex, colIndex)}
                                        >
                                            <View>
                                                {item}
                                            </View>
                                        </TouchableHighlight>
                                    ))}
                                </View>
                            ))}
                        </View>
                        
                        <View style={styles.shapesContainer}>
                            <TouchableHighlight
                                onPress={() => this.updateShape('L')}
                            >
                                <Image
                                    source={{ uri: 'https://codehs.com/uploads/3c0822ddebb4db619556996be923f6b5' }}
                                    style={{ height: 60, width: 60 }}
                                />
                            </TouchableHighlight>
                            
                            <TouchableHighlight
                                onPress={() => this.updateShape('square')}
                            >
                                <Image
                                    source={{ uri: 'https://codehs.com/uploads/a38f483d41714938aa9acd221d222ca7' }}
                                    style={{ height: 60, width: 60 }}
                                />
                            </TouchableHighlight>
                        </View>
            
            
    
                    </View>
                </View>
                
                <View style={{display: this.state.gameOverScreen}}>
                <View style={styles.content}>
                    <Text style={styles.gameoverText}>
                        GAME OVER
                    </Text>
                    
                    <TouchableHighlight style={styles.temporaryButton}
                    onPress={this.handleGameScreenPress}
                    >
                    <Text style={styles.startButtonText}>
                        Play Again
                    </Text>
                    </TouchableHighlight>
                    
                    <TouchableHighlight style={styles.temporaryButton}
                    onPress={this.handleHighScoresScreenPress}
                    >
                    <Text style={styles.startButtonText}>
                        High Scores
                    </Text>
                    </TouchableHighlight>
                </View>
                </View>
                
                <View style={{display: this.state.highScoresScreen}}>
                <View style={styles.content}>
                    <Text style={styles.highScoresText}>
                        HIGH SCORES
                    </Text>
                    
                    <View style={styles.scoresContainer}>
                    <ScrollView>
                        {this.state.records.map((game) => (
                            <View style={styles.gameContainer}>
                                <Text style={styles.scoreText}>
                                    {game.finalScore}
                                </Text>
                            </View>
                        ))}
                    </ScrollView>
                    </View>
                    
                    <TouchableHighlight style={styles.temporaryButton}
                    onPress={this.handleGameScreenPress}
                    >
                    <Text style={styles.startButtonText}>
                        Play Again
                    </Text>
                    </TouchableHighlight>
                </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: deviceHeight,
        width: deviceWidth
    },
    
    content: {
        alignItems: 'center',
        backgroundColor: 'royalblue',
        height: deviceHeight
    },
    
    gridContainer: {
        marginTop: deviceHeight/32
    },
    
    row: {
        flexDirection: 'row',
        color: 'lightblue'
    },
    
    titleText: {
        margin: 24,
        fontSize: 70,
        fontFamily: 'courier',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: deviceHeight/8,
        color: 'yellow',
        fontWeight: 'bold'
    },
    
    scoreText: {
        fontSize: 70,
        fontFamily: 'courier',
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'yellow',
        fontWeight: 'bold'
    },
    
    startButton: {
        width: deviceWidth*5/6,
        height: deviceWidth/5,
        backgroundColor: 'yellow',
        borderWidth: 5,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: deviceHeight*1.5/5
    },
    
    gridSquareB: {
        width: deviceWidth*19/160,
        height: deviceWidth*19/160,
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: 'lightblue'
    },
    
    gridSquareR: {
        width: deviceWidth*19/160,
        height: deviceWidth*19/160,
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: 'red'
    },
    
    shapesContainer: {
        flexDirection: 'row',
        marginTop: 30,
        width: deviceWidth*9/10,
        justifyContent: 'flex-start'
    },
    
    temporaryButton: {
        width: deviceWidth*5/6,
        height: deviceWidth/5,
        backgroundColor: 'yellow',
        borderWidth: 5,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginBottom: 40,
    },
    
    gameoverText: {
        fontSize: 50,
        fontFamily: 'courier',
        color: 'yellow',
        marginTop: deviceHeight/4,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: deviceHeight/3
    },
    
    highScoresText: {
        fontSize: 50,
        fontFamily: 'courier',
        color: 'yellow',
        marginTop: deviceHeight/16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    
    startButtonText: {
        color: 'royalblue',
        fontFamily: 'courier',
        fontSize: 40,
        fontWeight: 'bold'
    },
    
    scoresContainer: {
        height: deviceHeight/2,
        width: deviceWidth*5/6,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: 'lightgray',
        borderColor: 'black',
        borderWidth: 5,
        marginTop: deviceHeight/20,
        marginBottom: deviceHeight/12
    },
    
    gameContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
});

