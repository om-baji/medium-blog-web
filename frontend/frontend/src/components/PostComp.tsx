interface PostProps {
    title: string;
    description: string;
    author: string;
    date?: string;
}

function PostComp({ title, description, author, date }: PostProps) {
    return (
        <div className="w-[90%] mx-auto p-6 mb-6 grid gap-6 md:grid-cols-[70%_30%]">
            <div className="flex flex-col gap-4 md:gap-6">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-2">{title}</h1>
                <p className="text-gray-700 leading-relaxed text-base md:text-xl lg:text-2xl">
                    {description}
                </p>
            </div>
            <div className="flex flex-col justify-start items-start gap-4 p-4 md:p-6 text-gray-900 bg-gray-100 rounded-md">
                <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-300 text-gray-800 flex items-center justify-center text-lg md:text-xl font-bold rounded">
                        {author.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-base md:text-lg font-semibold">Author:</span>
                        <span className="text-lg md:text-xl lg:text-2xl font-medium">{author}</span>
                    </div>
                </div>
                <div className="flex flex-col">
                    <span className="text-base md:text-lg font-semibold">Published:</span>
                    <span className="text-lg md:text-xl lg:text-2xl">{date}</span>
                </div>
                <span className="italic text-sm md:text-md text-gray-600">Medium User</span>
                <br />
                <br />
                <span className="italic text-sm md:text-base lg:text-gray-600">
                    "The customer support I received was exceptional. The support team went above and beyond to address my concerns."
                </span>
            </div>
        </div>



    );
}

export default PostComp;
