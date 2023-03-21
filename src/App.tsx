import React, { useState } from 'react';
import  styles  from './App.module.css'
import { Select, SelectOption } from './components/Select';

const options = [
  { label: "First", value: 1 },
  { label: "Second", value: 2 },
  { label: "Third", value: 3 },
  { label: "Fourth", value: 4 },
  { label: "Fifth", value: 5 },
]

export default function App(): JSX.Element {
  const [value, setValue] = useState<SelectOption | undefined>(options[0])

  return (
    <div className={styles.wrapper}>
        <div className={styles.test}>
        <Select options={options} value={value} onChange={ option => setValue(option)} />
        </div>
    </div>
  );
}


