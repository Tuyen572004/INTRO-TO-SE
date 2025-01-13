import { useEffect, useState } from "react";
import { UserAPI } from "../../../../api/UserAPI";
import { PostAPI } from "../../../../api/PostAPI";
import { ReportPostAPI } from "../../../../api/ReportPostAPI";
import Loading from "../../../atoms/Loading/Loading";
import StatCard from "../../../atoms/StatCard/StatCard";
import { AlertTriangle, FileText, Users } from "lucide-react";

const AdminDashboard = () => {
  const [stats, setStats] = useState({});

  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const totalUsers = await UserAPI.countUsers();
      const totalPosts = await PostAPI.countPosts();
      const violatingPosts = await ReportPostAPI.countReports();

      setStats({
        totalUsers: totalUsers.data,
        totalPosts: totalPosts.data,
        violatingPosts: violatingPosts.data,
      });
    } catch (error) {
      console.error("Error fetching stats", error);
    }
  };

  useEffect(() => {
    fetchStats().then(() => setLoading(false));
  }, []);

  return (
    <div className="container px-3 w-100">
      {loading ? (
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ height: "50%" }}
        >
          <Loading />
        </div>
      ) : (
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
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
