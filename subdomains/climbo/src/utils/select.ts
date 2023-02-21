import { Option } from "typings";

export const createOptions = <T extends string | number = string>(
	values: readonly T[],
	labels: {
		[key in T]: string
	}
): Option<T>[] => {
	return values.map(value => {
		return {
			value,
			label: labels[value]
		}
	})
}