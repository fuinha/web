/**
 * A visible value type; boxes in a value with a boolean type.
 *
 * @export
 * @interface VisibleValue
 * @template T Type of underlying value.
 */
export interface VisibleValue<T> {
	/**
	 * Whether or not the value is visible.
	 *
	 * @type {boolean}
	 * @memberof VisibleValue
	 */
	visible: boolean
	/**
	 * The value encapsulated in the interface.
	 *
	 * @type {T}
	 * @memberof VisibleValue
	 */
	value: T
}

/**
 * A general type that documents type coercion possibilities.
 *
 * @export
 * @interface AsInterface
 * @template T Returning interface type.
 */
export interface AsInterface<T> {
	asInterface(): T
}
