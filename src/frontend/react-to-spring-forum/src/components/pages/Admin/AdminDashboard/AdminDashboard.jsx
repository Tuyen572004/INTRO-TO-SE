import { Users, FileText, AlertTriangle, UserX, Clock, Star } from 'lucide-react';
import StatCard from "../../../atoms/StatCard/StatCard";

const AdminDashboard = () => {
    const stats = {
        totalUsers: 15234,
        totalPosts: 45678,
        violatingPosts: 234,
        violatingUsers: 89,
        activeUsers: 8976,
        averagePostsPerDay: 456,
        topRatedPosts: 789,
        reportedContent: 123
    };

    return (
        <div className="container px-3">
            <div className="row g-4">
                <div className="col-md-6">
                    <StatCard
                        icon={Users}
                        title="Total Users"
                        value={stats.totalUsers}
                        bgColor="bg-primary"
                        textColor="text-white"
                    />
                </div>
                <div className="col-md-6">
                    <StatCard
                        icon={FileText}
                        title="Total Posts"
                        value={stats.totalPosts}
                        bgColor="bg-success"
                        textColor="text-white"
                    />
                </div>

                <div className="col-md-6">
                    <StatCard
                        icon={AlertTriangle}
                        title="Violating Posts"
                        value={stats.violatingPosts}
                        bgColor="bg-danger"
                        textColor="text-white"
                    />
                </div>

                <div className="col-md-6">
                    <StatCard
                        icon={UserX}
                        title="Violating Users"
                        value={stats.violatingUsers}
                        bgColor="bg-warning"
                        textColor="text-white"
                    />
                </div>

                <div className="col-md-6">
                    <StatCard
                        icon={Clock}
                        title="Average Posts/Day"
                        value={stats.averagePostsPerDay}
                        bgColor="bg-secondary"
                        textColor="text-white"
                    />
                </div>

                <div className="col-md-6">
                    <StatCard
                        icon={Star}
                        title="Top Rated Posts"
                        value={stats.topRatedPosts}
                        bgColor="bg-dark"
                        textColor="text-white"
                    />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;