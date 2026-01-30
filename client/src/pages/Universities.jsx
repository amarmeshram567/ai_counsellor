import { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { GraduationCap, CheckCircle, Lock, ArrowLeft, LayoutDashboard } from "lucide-react";
import { toast } from "react-hot-toast"; // for notifications
import UniversityFilters from "../components/universities/UniversityFilters";
import UniversityCard from "../components/universities/UniversityCard";
import { addToShortlist, fetchLockedUniversity, fetchShortlist, fetchUniversity, lockUniversity, removeFromShortlist, unlockUniversity } from "../store/slices/universitiesSlice";
import { Link } from "react-router-dom";

const Universities = () => {
    const dispatch = useDispatch();
    const { universities, shortlist, locked, currentStage } = useSelector(
        (state) => state.universities
    );

    console.log(
        "universities: ", universities,
        "shortlist------: ", shortlist,
        "locked: ", locked,
        "current stage: ", currentStage
    )

    useEffect(() => {
        const loadData = async () => {
            await dispatch(fetchUniversity());
            await dispatch(fetchShortlist());
            await dispatch(fetchLockedUniversity());
        };
        loadData();
    }, [dispatch]);


    // Filter states
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("all");
    const [budgetRange, setBudgetRange] = useState([0, 100000]);

    // Modal state
    const [lockModalOpen, setLockModalOpen] = useState(false);
    const [selectedUniversity, setSelectedUniversity] = useState(null);

    // Derived data
    const countries = useMemo(
        () => [...new Set(universities.map((u) => u.country))],
        [universities]
    );

    const maxBudget = useMemo(
        () => universities.length ? Math.max(...universities.map(u => u.tuitionFee)) : 100000,
        [universities]
    );


    // Filtered universities
    const filteredUniversities = useMemo(() => {
        return universities.filter((uni) => {
            const matchesSearch =
                searchQuery === "" ||
                uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                uni.city.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesCountry =
                selectedCountry === "all" || uni.country === selectedCountry;

            const matchesBudget =
                uni.tuitionFee >= budgetRange[0] && uni.tuitionFee <= budgetRange[1];

            return matchesSearch && matchesCountry && matchesBudget;
        });
    }, [universities, searchQuery, selectedCountry, budgetRange]);



    const isShortlisted = (universityId) =>
        shortlist.some(u => (u.universityId ?? u.id) === universityId);


    // Handlers

    const handleToggleShortlist = async (university) => {
        const isCurrentlyShortlisted = isShortlisted(university.id);

        try {
            if (isCurrentlyShortlisted) {
                await dispatch(removeFromShortlist(university.id)).unwrap();
                toast.success(`${university.name} removed from shortlist`);
            } else {
                await dispatch(addToShortlist({
                    ...university,
                    category: university.category || "default",
                })).unwrap();
                toast.success(`${university.name} added to shortlist`);
            }
        } catch (err) {
            toast.error(err?.message || "Failed to update shortlist");
        }
    };






    const handleLockClick = (university) => {
        setSelectedUniversity(university);
        setLockModalOpen(true);
    };




    const handleLockConfirm = async () => {
        if (!selectedUniversity) return;

        try {
            if (locked?.universityId === selectedUniversity.id) {
                await dispatch(unlockUniversity(selectedUniversity.id)).unwrap();
                toast.success(`${selectedUniversity.name} unlocked`);
            } else {
                await dispatch(lockUniversity(selectedUniversity)).unwrap();
                toast.success(`${selectedUniversity.name} locked as your chosen university`);
            }
        } catch (err) {
            toast.error(err?.message || "Failed to update lock");
        } finally {
            setLockModalOpen(false);
            setSelectedUniversity(null); // close modal
        }
    };


    const lockedUniversityId = locked?.universityId;
    const isSelectedLocked = locked?.universityId === selectedUniversity?.id || selectedUniversity?.isLocked;





    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white  border-b border-gray-200 sticky top-0 z-10">
                <div className="container mx-auto px-4 py-1.5 flex items-center gap-3">

                    <Link to='/dashboard' className="items-center mr-2">
                        <ArrowLeft className="text-gray-500" />
                    </Link>

                    <div className="p-2 bg-blue-100 rounded-lg">
                        <GraduationCap className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                        <h1 className="text-xl font-medium text-gray-900">University Finder</h1>
                        <p className="text-sm text-gray-500">
                            Discover and compare universities worldwide
                        </p>
                    </div>
                </div>


            </header>

            <main className="container mx-auto px-4 py-8 space-y-8">
                {/* Stats Bar */}
                <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200">
                        <span className="text-gray-500">Total Universities:</span>
                        <span className="font-bold text-gray-900">{universities.length}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200">
                        <span className="text-gray-500">Shortlisted:</span>
                        <span className="font-bold text-pink-600">{shortlist.length}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200">
                        <span className="text-gray-500">Locked:</span>
                        <span className="font-bold text-green-600">
                            {lockedUniversityId ? 1 : 0}
                        </span>

                    </div>
                    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200">
                        <span className="text-gray-500">Current Stage:</span>
                        <span className="font-bold text-blue-600">{currentStage}</span>
                    </div>
                </div>

                {/* Filters */}
                <UniversityFilters
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    selectedCountry={selectedCountry}
                    onCountryChange={setSelectedCountry}
                    budgetRange={budgetRange}
                    onBudgetChange={setBudgetRange}
                    countries={countries}
                    maxBudget={maxBudget}
                />

                {/* University Grid */}
                {filteredUniversities.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredUniversities.map((university) => (
                            <UniversityCard
                                key={university.id}
                                university={university}
                                isShortlisted={shortlist.some(u => u.universityId === university.id)}
                                isLocked={lockedUniversityId === university.id}
                                currentStage={currentStage}
                                onToggleShortlist={() => handleToggleShortlist(university)}
                                onLockClick={() => handleLockClick(university)}
                            />

                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <GraduationCap className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            No universities found
                        </h3>
                        <p className="text-gray-500">Try adjusting your search or filters</p>
                    </div>
                )}



                {lockModalOpen && selectedUniversity && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
                        <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
                            <div className="flex flex-col items-center">
                                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
                                    {isSelectedLocked ? (
                                        <CheckCircle className="h-6 w-6 text-green-600" />
                                    ) : (
                                        <Lock className="h-6 w-6 text-gray-600" />
                                    )}
                                </div>

                                <h2 className="text-lg font-semibold mb-2">
                                    {isSelectedLocked ? "Unlock University?" : "Lock University?"}
                                </h2>

                                <p className="text-sm text-gray-500 mb-6 text-center">
                                    {isSelectedLocked
                                        ? `Are you sure you want to unlock ${selectedUniversity.name}?`
                                        : `Are you sure you want to lock ${selectedUniversity.name} as your chosen university?`}
                                </p>

                                <div className="flex gap-4">
                                    <button
                                        onClick={() => setLockModalOpen(false)}
                                        className="px-4 py-2 border-2 text-red-600 bg-red-50 hover:bg-red-100 cursor-pointer border-red-500 rounded-lg"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        onClick={handleLockConfirm}
                                        className="px-4 py-2 text-green-600 bg-green-50 hover:bg-green-100 border-2 border-green-500 rounded-lg"
                                    >
                                        {isSelectedLocked ? "Unlock" : "Lock"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}



            </main>
        </div>
    );
};

export default Universities;

