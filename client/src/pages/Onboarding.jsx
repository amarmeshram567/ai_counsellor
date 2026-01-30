import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    ArrowRight,
    Loader2,
    Sparkles,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";


import { toast } from "react-hot-toast";
import AcademicBackgroundStep from "../components/Onboarding/AcademicBackgroundStep";
import StudyGoalsStep from "../components/Onboarding/StudyGoalsStep";
import BudgetStep from "../components/Onboarding/BudgetStep";
import ExamsDocumentsStep from "../components/Onboarding/ExamsDocumentsStep";
import StepIndicator from "../components/Onboarding/StepIndicator";
import { updateProfile } from "../store/slices/profileSlice";
import { fetchCurrentStage, updateStage } from "../store/slices/universitiesSlice";

const TOTAL_STEPS = 4;

const stepInfo = [
    {
        title: "Academic Background",
        description: "Tell us about your educational journey",
    },
    {
        title: "Study Goals",
        description: "Where do you want to go and what do you want to study?",
    },
    {
        title: "Budget Planning",
        description: "Help us understand your financial planning",
    },
    {
        title: "Exams & Documents",
        description: "Track your exam preparation and documents",
    },
];

const initialOnboardingData = {
    educationLevel: "",
    major: "",
    graduationYear: "",
    gpa: "",
    targetDegree: "",
    field: "",
    intakeYear: "",
    countries: [],
    budgetRange: "",
    fundingType: "",
    ieltsStatus: "",
    greStatus: "",
    sopStatus: "",
};



const Onboarding = () => {


    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.profile);


    // const currentStep = useSelector(state => state.universities.currentStage);


    const navigate = useNavigate();

    const [data, setData] = useState(initialOnboardingData);
    const [localStep, setLocalStep] = useState(0)

    const [loadingStage, setLoadingStage] = useState(true);


    const updateData = (updates) => {
        setData((prev) => ({ ...prev, ...updates }));
    };


    // useEffect(() => {
    //     dispatch(fetchCurrentStage());
    // }, [dispatch]);

    // useEffect(() => {
    //     setLocalStep(currentStep)
    // }, [currentStep])


    useEffect(() => {
        dispatch(fetchCurrentStage())
            .then(res => {
                if (res.payload && typeof res.payload.currentStage === "number") {
                    setLocalStep(res.payload.currentStage);
                } else {
                    setLocalStep(0); // default to step 0
                }
            })
            .finally(() => setLoadingStage(false)); // mark as loaded
    }, [dispatch]);




    const handleSubmit = async () => {
        try {
            const result = await dispatch(updateProfile(data));
            if (updateProfile.fulfilled.match(result)) {
                toast.success("Profile saved successfully!");
                navigate("/dashboard");
            } else {
                toast.error("Failed to save profile");
            }
        } catch (error) {
            toast.error("Something went wrong");
            console.error(error);
        }
    };


    const isStepValid = (step) => {
        switch (step) {
            case 0:
                return (
                    data.educationLevel &&
                    data.major &&
                    data.graduationYear &&
                    data.gpa
                );
            case 1:
                return (
                    data.targetDegree &&
                    data.field &&
                    data.intakeYear &&
                    data.countries.length > 0
                );
            case 2:
                return data.budgetRange && data.fundingType;
            case 3:
                return data.ieltsStatus && data.greStatus && data.sopStatus;
            default:
                return false;
        }
    };


    const handleNext = () => {
        if (localStep < TOTAL_STEPS - 1) {
            const next = localStep + 1;
            setLocalStep(next); // instant UI update
            dispatch(updateStage(next)); // backend update
        }
    };

    const handleBack = () => {
        if (localStep > 0) {
            const prev = localStep - 1;
            setLocalStep(prev);
            dispatch(updateStage(prev));
        }
    };


    if (loadingStage || localStep === undefined) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                <span className="ml-2 text-blue-600 text-lg">Loading onboarding...</span>
            </div>
        );
    }





    const renderStep = (step) => {
        switch (step) {
            case 0:
                return <AcademicBackgroundStep data={data} updateData={updateData} />;
            case 1:
                return <StudyGoalsStep data={data} updateData={updateData} />;
            case 2:
                return <BudgetStep data={data} updateData={updateData} />;
            case 3:
                return <ExamsDocumentsStep data={data} updateData={updateData} />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                        <Sparkles className="w-4 h-4" />
                        Getting Started
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Let&apos;s personalize your experience
                    </h1>

                    <p className="text-gray-600">
                        Complete your profile to get tailored recommendations
                    </p>
                </div>

                {/* Step Indicator */}
                <StepIndicator
                    currentStep={localStep}
                    totalSteps={TOTAL_STEPS}
                />

                {/* Card */}
                <div className="bg-white rounded-xl shadow-md p-6 transition-shadow">
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-900">
                            {stepInfo[localStep].title}
                        </h2>
                        <p className="text-sm text-gray-500">
                            {stepInfo[localStep].description}

                        </p>
                    </div>

                    {renderStep(localStep)}

                    {/* Navigation */}
                    <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                        <button
                            onClick={handleBack}
                            disabled={localStep === 0}
                            className="flex items-center gap-2 text-gray-500 px-4 py-2 rounded-md border border-gray-300 text-sm
                         disabled:opacity-50 disabled:cursor-not-allowed
                         hover:bg-gray-100"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back
                        </button>

                        {localStep < TOTAL_STEPS - 1 ? (
                            <button
                                onClick={handleNext}
                                disabled={!isStepValid(localStep)}
                                className="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white text-sm
                           disabled:opacity-50 disabled:cursor-not-allowed
                           hover:bg-blue-700"
                            >
                                Next
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                disabled={!isStepValid(localStep) || loading}
                                className="flex items-center gap-2 px-4 py-2 rounded-md bg-green-600 text-white text-sm
                           disabled:opacity-50 disabled:cursor-not-allowed
                           hover:bg-green-700"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        Complete Setup
                                        <Sparkles className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                </div>

                {/* Step Counter */}
                <p className="text-center text-sm text-gray-500 mt-4">
                    Step {localStep + 1} of {TOTAL_STEPS}
                </p>
            </div>
        </div>
    );
};

export default Onboarding;
