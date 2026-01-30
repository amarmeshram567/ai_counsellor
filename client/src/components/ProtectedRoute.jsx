import { Navigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export function ProtectedRoute({
    children,
    requiredStage,
    requiresAuth = true,
    requiresOnboarding = true,
}) {
    const { user, onboardingComplete, currentStage } = useApp();
    const location = useLocation();

    // Not logged in
    if (requiresAuth && !user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Onboarding not complete
    if (requiresOnboarding && user && !onboardingComplete) {
        return <Navigate to="/onboarding" replace />;
    }

    // Stage access check
    if (requiredStage && requiredStage > currentStage) {
        return <Navigate to="/dashboard" replace />;
    }

    return <>{children}</>;
}
