import { useState } from "react";

const Title = ({ setIsValid, updateJobData }) => {
    const [title, setTitle] = useState("");
    const handleChange = (e) => {
        const newTitle = e.target.value;

        setTitle(newTitle);
        setIsValid(newTitle.length > 0);
        updateJobData({ title: newTitle })

        

    };

    return (
        <div className="flex flex-col gap-3">
            <p className="font-semibold">
                Write a title for your job post.
            </p>
            <input
                type="text"
                onChange={handleChange}
                value={title} // This ensures the input is controlled
                className="rounded-md border p-2 w-2/3"
            />
            <p className="font-semibold"> Example titles  </p>
            <ul className="list-disc">
                <li>Build responsive WordPress site with booking/payment functionality</li>
                <li>Graphic designer needed to design ad creative for multiple campaigns</li>
                <li>Facebook ad specialist needed for product launch</li>
            </ul>
        </div>
    );
}

export default Title;
