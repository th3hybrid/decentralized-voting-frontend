const Navbar = () => {
    return (
        <nav className="sticky top-0 w-full flex justify-between items-center py-5 bg-green-500 dark:bg-darkModeElements lg:px-16 md:px-12 px-5 z-10 ">
            <h3 className="text-2xl font-bold">Shall we vote?</h3>
            <button className="border-2 border-white p-2">Connect wallet</button>
        </nav>
    )
}

export default Navbar