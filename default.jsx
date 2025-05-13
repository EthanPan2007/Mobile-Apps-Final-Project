import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, Image, TextInput, ImageBackground, TouchableHighlight, Dimensions, ScrollView } from 'react-native';
import Constants from 'expo-constants';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

export default class App extends Component {
    state = {
        titleScreen: 'block',
        gameScreen: 'none',
        shape: null,
        nextShapes: [],
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
        gameOverScreen: 'none',
        highScoresScreen: 'none',
        score: 0,
        finalScore: 0,
        records: [],
        gameActive: false,
    }
    
    componentDidMount() {
        this.generateNextShapes(3);
    }

    generateNextShapes = (count) => {
        const shapes = [
            'L', 'L-left', 'L-right', 'L-down',
            'square', 'big-square',
            'vertical', 'horizontal',
            'T', 'T-left', 'T-right', 'T-down'
        ];
        const newShapes = Array(count).fill().map(() => shapes[Math.floor(Math.random() * shapes.length)]);
        this.setState({ 
            nextShapes: newShapes,
            shape: newShapes[0]
        });
    }

    updateShape = (shape) => {
        this.setState({
            shape: shape
        });
    };
    
    updateScore = (amount) => {
        this.setState(prevState => ({
            score: prevState.score + amount
        }));
    };
    
    updateRecords = () => {
        const newRecord = {
            finalScore: this.state.score,
            date: new Date().toLocaleDateString()
        };
        
        this.setState(prevState => ({
            records: [...prevState.records, newRecord].sort((a, b) => b.finalScore - a.finalScore).slice(0, 10),
            score: 0
        }));
    };
    
    initializeGame = () => {
        const emptyGrid = Array(8).fill().map(() => Array(8).fill('b'));
        this.generateNextShapes(3);
        
        this.setState({
            grid: emptyGrid,
            score: 0,
            gameActive: true,
            shape: this.state.nextShapes[0]
        });
    }
    
    canPlaceShape = (shape, row, col) => {
        const { grid } = this.state;
        
        // L shapes
        if (shape === 'L') { // Normal L (pointing right)
            if (row > 5 || col > 6) return false;
            return (
                grid[row][col] === 'b' &&
                grid[row+1][col] === 'b' &&
                grid[row+2][col] === 'b' &&
                grid[row+2][col+1] === 'b'
            );
        } else if (shape === 'L-left') { // L pointing left
            if (row > 5 || col < 1) return false;
            return (
                grid[row][col] === 'b' &&
                grid[row+1][col] === 'b' &&
                grid[row+2][col] === 'b' &&
                grid[row+2][col-1] === 'b'
            );
        } else if (shape === 'L-right') { // L pointing right but upside down
            if (row > 5 || col > 6) return false;
            return (
                grid[row][col] === 'b' &&
                grid[row][col+1] === 'b' &&
                grid[row+1][col] === 'b' &&
                grid[row+2][col] === 'b'
            );
        } else if (shape === 'L-down') { // L pointing down
            if (row > 6 || col > 5) return false;
            return (
                grid[row][col] === 'b' &&
                grid[row][col+1] === 'b' &&
                grid[row][col+2] === 'b' &&
                grid[row+1][col] === 'b'
            );
            
        // Square shapes
        } else if (shape === 'square') {
            if (row > 6 || col > 6) return false;
            return (
                grid[row][col] === 'b' &&
                grid[row][col+1] === 'b' &&
                grid[row+1][col] === 'b' &&
                grid[row+1][col+1] === 'b'
            );
        } else if (shape === 'big-square') {
            if (row > 5 || col > 5) return false;
            return (
                grid[row][col] === 'b' &&
                grid[row][col+1] === 'b' &&
                grid[row][col+2] === 'b' &&
                grid[row+1][col] === 'b' &&
                grid[row+1][col+1] === 'b' &&
                grid[row+1][col+2] === 'b' &&
                grid[row+2][col] === 'b' &&
                grid[row+2][col+1] === 'b' &&
                grid[row+2][col+2] === 'b'
            );
            
        // Line shapes
        } else if (shape === 'vertical') {
            if (row > 5) return false;
            return (
                grid[row][col] === 'b' &&
                grid[row+1][col] === 'b' &&
                grid[row+2][col] === 'b'
            );
        } else if (shape === 'horizontal') {
            if (col > 5) return false;
            return (
                grid[row][col] === 'b' &&
                grid[row][col+1] === 'b' &&
                grid[row][col+2] === 'b'
            );
            
        // T shapes
        } else if (shape === 'T') { // Normal T (pointing down)
            if (row > 6 || col < 1 || col > 6) return false;
            return (
                grid[row][col] === 'b' &&
                grid[row+1][col-1] === 'b' &&
                grid[row+1][col] === 'b' &&
                grid[row+1][col+1] === 'b'
            );
        } else if (shape === 'T-left') { // T pointing left
            if (row > 6 || col > 5) return false;
            return (
                grid[row][col] === 'b' &&
                grid[row][col+1] === 'b' &&
                grid[row][col+2] === 'b' &&
                grid[row+1][col+1] === 'b'
            );
        } else if (shape === 'T-right') { // T pointing right
            if (row < 1 || row > 6 || col > 5) return false;
            return (
                grid[row][col+1] === 'b' &&
                grid[row+1][col] === 'b' &&
                grid[row+1][col+1] === 'b' &&
                grid[row+1][col+2] === 'b'
            );
        } else if (shape === 'T-down') { // T pointing up
            if (row > 5 || col < 1 || col > 6) return false;
            return (
                grid[row][col-1] === 'b' &&
                grid[row][col] === 'b' &&
                grid[row][col+1] === 'b' &&
                grid[row+1][col] === 'b'
            );
        }
        return false;
    }

    placeShape = (shape, row, col) => {
        const newGrid = JSON.parse(JSON.stringify(this.state.grid));
        
        // L shapes
        if (shape === 'L') {
            newGrid[row][col] = 'f';
            newGrid[row+1][col] = 'f';
            newGrid[row+2][col] = 'f';
            newGrid[row+2][col+1] = 'f';
        } else if (shape === 'L-left') {
            newGrid[row][col] = 'f';
            newGrid[row+1][col] = 'f';
            newGrid[row+2][col] = 'f';
            newGrid[row+2][col-1] = 'f';
        } else if (shape === 'L-right') {
            newGrid[row][col] = 'f';
            newGrid[row][col+1] = 'f';
            newGrid[row+1][col] = 'f';
            newGrid[row+2][col] = 'f';
        } else if (shape === 'L-down') {
            newGrid[row][col] = 'f';
            newGrid[row][col+1] = 'f';
            newGrid[row][col+2] = 'f';
            newGrid[row+1][col] = 'f';
            
        // Square shapes
        } else if (shape === 'square') {
            newGrid[row][col] = 'f';
            newGrid[row][col+1] = 'f';
            newGrid[row+1][col] = 'f';
            newGrid[row+1][col+1] = 'f';
        } else if (shape === 'big-square') {
            newGrid[row][col] = 'f';
            newGrid[row][col+1] = 'f';
            newGrid[row][col+2] = 'f';
            newGrid[row+1][col] = 'f';
            newGrid[row+1][col+1] = 'f';
            newGrid[row+1][col+2] = 'f';
            newGrid[row+2][col] = 'f';
            newGrid[row+2][col+1] = 'f';
            newGrid[row+2][col+2] = 'f';
            
        // Line shapes
        } else if (shape === 'vertical') {
            newGrid[row][col] = 'f';
            newGrid[row+1][col] = 'f';
            newGrid[row+2][col] = 'f';
        } else if (shape === 'horizontal') {
            newGrid[row][col] = 'f';
            newGrid[row][col+1] = 'f';
            newGrid[row][col+2] = 'f';
            
        // T shapes
        } else if (shape === 'T') {
            newGrid[row][col] = 'f';
            newGrid[row+1][col-1] = 'f';
            newGrid[row+1][col] = 'f';
            newGrid[row+1][col+1] = 'f';
        } else if (shape === 'T-down') {
            newGrid[row][col-1] = 'f';
            newGrid[row][col] = 'f';
            newGrid[row][col+1] = 'f';
            newGrid[row+1][col] = 'f';
        }
        
        return newGrid;
    }

    checkCompletedLines = (grid) => {
        let clearedLines = 0;
        const newGrid = JSON.parse(JSON.stringify(grid));
        
        // Check rows
        for (let i = 0; i < 8; i++) {
            if (grid[i].every(cell => cell !== 'b')) {
                newGrid[i] = Array(8).fill('b');
                clearedLines++;
            }
        }
        
        // Check columns
        for (let j = 0; j < 8; j++) {
            const columnFull = grid.every(row => row[j] !== 'b');
            if (columnFull) {
                for (let i = 0; i < 8; i++) {
                    newGrid[i][j] = 'b';
                }
                clearedLines++;
            }
        }
        
        return { clearedLines, newGrid };
    }

    isBoardFull = (grid) => {
        return grid.every(row => row.every(cell => cell !== 'b'));
    }

    getNextShape = () => {
        const [currentShape, ...remainingShapes] = this.state.nextShapes;
        const newShapes = [...remainingShapes];
        
        if (newShapes.length < 2) {
            const shapes = [
                'L', 'L-left', 'L-right', 'L-down',
                'square', 'big-square',
                'vertical', 'horizontal',
                'T','T-down'
            ];
            newShapes.push(shapes[Math.floor(Math.random() * shapes.length)]);
        }
        
        this.setState({
            shape: newShapes[0],
            nextShapes: newShapes
        });
    }

    handleGridSquarePress = (row, col) => {
        if (!this.state.gameActive || !this.state.shape) return;
        
        if (this.canPlaceShape(this.state.shape, row, col)) {
            const newGrid = this.placeShape(this.state.shape, row, col);
            const { clearedLines, newGrid: updatedGrid } = this.checkCompletedLines(newGrid);
            
            // Update score
            if (clearedLines > 0) {
                this.updateScore(clearedLines * 100);
            }
            
            // Check for full board bonus
            if (this.isBoardFull(updatedGrid)) {
                this.updateScore(500);
                this.setState({ 
                    grid: Array(8).fill().map(() => Array(8).fill('b')),
                    score: this.state.score + 500
                });
            } else {
                this.setState({ grid: updatedGrid });
            }
            
            this.getNextShape();
            
            // Check if game over (no valid moves)
            const hasValidMoves = this.checkValidMoves();
            if (!hasValidMoves) {
                this.handleGameOver();
            }
        }
    }

    checkValidMoves = () => {
        const { shape, grid } = this.state;
        
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (this.canPlaceShape(shape, i, j)) {
                    return true;
                }
            }
        }
        return false;
    }

    handleGameOver = () => {
        this.setState({
            gameActive: false,
            finalScore: this.state.score,
            gameScreen: 'none',
            gameOverScreen: 'block'
        });
        this.updateRecords();
    }
    
    handleGameScreenPress = () => {
        this.setState({
            titleScreen: 'none',
            gameScreen: 'block',
            gameOverScreen: 'none',
            highScoresScreen: 'none',
        });
        this.initializeGame();
    };
    
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
    
    renderGridSquare = (item, rowIndex, colIndex) => {
        if (item === 'f') {
            return (
                <TouchableHighlight 
                    key={`${rowIndex}-${colIndex}`} 
                    style={styles.gridSquareR}
                    onPress={() => this.handleGridSquarePress(rowIndex, colIndex)}
                >
                    <View/>
                </TouchableHighlight>
            );
        }
        return (
            <TouchableHighlight 
                key={`${rowIndex}-${colIndex}`} 
                style={styles.gridSquareB}
                onPress={() => this.handleGridSquarePress(rowIndex, colIndex)}
            >
                <View/>
            </TouchableHighlight>
        );
    }
    
    render() {
        return (
            <View style={styles.container}>
                {/* Title Screen */}
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
                
                {/* Game Screen */}
                <View style={{display: this.state.gameScreen}}>
                    <View style={styles.content}>
                        <Text style={styles.scoreText}>
                            {this.state.score}
                        </Text>
                    
                        <View style={styles.gridContainer}>
                            {this.state.grid.map((row, rowIndex) => (
                                <View key={rowIndex} style={styles.row}>
                                    {row.map((item, colIndex) => (
                                        this.renderGridSquare(item, rowIndex, colIndex)
                                    ))}
                                </View>
                            ))}
                        </View>
                        
                        <View style={styles.shapesContainer}>
                            <Text style={styles.nextShapeText}>Next Shape:</Text>
                            <Image
                                source={{ uri: this.getShapeImageUri(this.state.shape)}}
                                style={{ height: 60, width: 60 }}
                            />
                        </View>
                    </View>
                </View>
                
                {/* Game Over Screen */}
                <View style={{display: this.state.gameOverScreen}}>
                    <View style={styles.content}>
                        <Text style={styles.gameoverText}>
                            GAME OVER
                        </Text>
                        <Text style={styles.finalScoreText}>
                            Score: {this.state.finalScore}
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
                
                {/* High Scores Screen */}
                <View style={{display: this.state.highScoresScreen}}>
                    <View style={styles.content}>
                        <Text style={styles.highScoresText}>
                            HIGH SCORES
                        </Text>
                        
                        <View style={styles.scoresContainer}>
                            <ScrollView>
                                {this.state.records.map((game, index) => (
                                    <View key={index} style={styles.gameContainer}>
                                        <Text style={styles.recordText}>
                                            {index + 1}. {game.finalScore} - {game.date}
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
    
    getShapeImageUri = (shape) => {
        switch(shape) {
            case 'L':
                return 'https://codehs.com/uploads/f06ba2fecef7e9d13404e68cd91e2da5';
            case 'L-left':
                return 'https://codehs.com/uploads/6d79aee16b79ce577accea5918d36142';
            case 'L-right':
                return 'https://codehs.com/uploads/7e4fb345a720214824452759dbf86167';
            case 'L-down':
                return 'https://codehs.com/uploads/bc28e53d3afc544426742f159be789dd';
            case 'square':
                return 'https://codehs.com/uploads/12e99618fc183564d562af2219c670a1';
            case 'big-square':
                return 'https://codehs.com/uploads/e5c90831237f10907ba1f198b4f31b4f';
            case 'vertical':
                return 'https://codehs.com/uploads/0573408f9b6c50cd84436e01cf7bb984';
            case 'horizontal':
                return 'https://codehs.com/uploads/a1a196f8635a76329b4e34d84d15d360';
            case 'T':
                return 'https://codehs.com/uploads/0be2bf4e24ba60bffc3e73ebc81fff82';
            case 'T-down':
                return 'https://codehs.com/uploads/e340ac244fd425359409ce532e3e295b';
            default:
                return 'https://codehs.com/uploads/bcbdc13058fe73fc697729a08020c773';
        }
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
        height: deviceHeight,
        paddingTop: Constants.statusBarHeight
    },
    
    gridContainer: {
        marginTop: deviceHeight/32
    },
    
    row: {
        flexDirection: 'row',
    },
    
    titleText: {
        margin: 24,
        fontSize: 70,
        fontFamily: 'courier',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: deviceHeight/8,
        color: 'yellow',
    },
    
    scoreText: {
        fontSize: 50,
        fontFamily: 'courier',
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'yellow',
        marginTop: 20
    },
    
    finalScoreText: {
        fontSize: 40,
        fontFamily: 'courier',
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'yellow',
        marginBottom: 40
    },
    
    recordText: {
        fontSize: 24,
        fontFamily: 'courier',
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black',
        padding: 10
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
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20
    },
    
    nextShapeText: {
        fontSize: 24,
        fontFamily: 'courier',
        color: 'yellow',
        fontWeight: 'bold'
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
        marginBottom: 20,
    },
    
    gameoverText: {
        fontSize: 50,
        fontFamily: 'courier',
        color: 'yellow',
        marginTop: deviceHeight/8,
        fontWeight: 'bold',
        textAlign: 'center',
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

AppRegistry.registerComponent('App', () => App);