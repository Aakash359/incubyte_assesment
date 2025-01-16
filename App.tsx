import {StyleSheet, Text, TextInput, View, Button, Alert} from 'react-native';
import React, {useState} from 'react';

const App = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  const add = (numbers: any) => {
    if (!numbers) return 0; // Handle empty input

    let delimiter = /,|\n/; // Default delimiters (comma and newline)

    // Check for custom delimiter
    if (numbers.startsWith('//')) {
      const delimiterEndIndex = numbers.indexOf('\n');
      delimiter = new RegExp(
        numbers
          .slice(2, delimiterEndIndex)
          .replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
      ); // Escape special regex characters
      numbers = numbers.slice(delimiterEndIndex + 1);
    }

    const numberArray = numbers.split(delimiter).map(Number);

    // Find negative numbers
    const negatives = numberArray.filter((num: any) => num < 0);
    if (negatives.length > 0) {
      throw new Error(`Negative numbers not allowed: ${negatives.join(', ')}`);
    }

    return numberArray.reduce(
      (sum: any, num: any) => sum + (isNaN(num) ? 0 : num),
      0,
    ); // Sum up the numbers
  };

  const handleCalculate = () => {
    try {
      const calculationResult = add(input);
      setResult(calculationResult);
    } catch (error) {
      Alert.alert('Error', error.message);
      setResult(null);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>String Calculator</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter numbers (e.g., 1,2 or //;\n1;2)"
        value={input}
        onChangeText={setInput}
        multiline
      />

      <Button title="Calculate" onPress={handleCalculate} />

      {result !== null && <Text style={styles.result}>Result: {result}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 100,
    borderColor: '#ced4da',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    textAlignVertical: 'top',
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;
