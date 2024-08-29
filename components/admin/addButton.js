import Link from "next/link";

export default function AddButton() {

    return (
        <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-300 text-white font-normal w-32 text-center mx-auto p-2 rounded-md"
        >
            Add
        </button>
    )
}