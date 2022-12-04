package util

func Range(start, end int) []int {
	arr := []int{}
	for i := start; i <= end; i++ {
		arr = append(arr, i)
	}

	return arr
}
