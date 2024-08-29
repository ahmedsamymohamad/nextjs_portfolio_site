

export default function DeleteButton({ onClick,className }) {

    return (
        <button
            type="button"
            className={`bg-red-500 hover:bg-red-300 text-white font-normal  text-center mx-auto p-2 rounded-md ${className}`}
            onClick={onClick}
        >
            Delete
        </button>
    )
}