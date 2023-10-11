import Spinner from "../icons/Spinner";

const Loader = () => {
	return (
		<div className="absolute z-30 bg-gray-500/50 w-screen h-screen inset-0 flex justify-center items-center">
			<div className="justify-center">
				<Spinner />
				<span className="-ml-2 text-2xl font-bold ">Loading...</span>
			</div>
		</div>
	);
};

export default Loader;
