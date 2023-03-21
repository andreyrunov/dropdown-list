import React, { useEffect, useState } from 'react'
import styles from './MultiSelect.module.css'

export type SelectOption = {
	label: string
	value: string | number
}

type MultipleSelectProps = {
	value: SelectOption[]
	onChange: (value: SelectOption[]) => void
}

type SelectProps = {
	options: SelectOption[]
} & MultipleSelectProps


export function MultiSelect({ value, options, onChange }: SelectProps) {
	const [isOpen, setIsOpen] = useState(false)
	const [highlightedIndex, setHighlightedIndex] = useState(0)

	function clearOptions() {
		onChange([])
	}

	function selectOption(option: SelectOption) {
		if (value.includes(option)) {
			onChange(value.filter(o => o !== option))
		} else {
			onChange([...value, option])
		}
	}

	function isOptionSelected(option: SelectOption) {
		return value.includes(option)
	}

	useEffect(() => {
		if (isOpen) setHighlightedIndex(0)
	}, [isOpen])

	return (
		<div onClick={() => setIsOpen(prev => !prev)} onBlur={() => setIsOpen(false)} tabIndex={0} className={styles.container}>
			<span className={styles.value}>{value.map(v => (
				<button 
					key={v.value} 
					onClick={e => {
					e.stopPropagation()
					selectOption(v)
					}}
					className={styles["option-badge"]}
				>
					{v.label}<span className={styles["remove-btn"]}>&times;</span>
				</button>
			))}</span>
			<button onClick={e => {
				e.stopPropagation()
				clearOptions()
			}} className={styles["clear-btn"]}>&times;</button>
			<div className={styles.divider}></div>
			<div className={styles.caret}></div>
			<ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
				{options.map((option, index) => (
					<li key={option.value}
						onClick={e => {
							e.stopPropagation()
							selectOption(option)
							setIsOpen(false)
						}}
						className={`${styles.option} ${isOptionSelected(option) ? styles.selected : ""} ${index === highlightedIndex ? styles.highlighted : ""}`}
						onMouseEnter={() => setHighlightedIndex(index)}
					>{option.label}</li>
				))}
			</ul>
		</div>
	)
}