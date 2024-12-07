
function StatCard({ icon: Icon, title, value, bgColor, textColor }) {
    return (
        <div className="card h-100 border-light shadow-sm">
            <div className="card-body d-flex align-items-center p-4">
                <div className={`rounded-circle p-3 me-4 ${bgColor} ${textColor}`}>
                    <Icon size={28} />
                </div>
                <div>
                    <h3 className="card-subtitle mb-2 text-muted">{title}</h3>
                    <p className="card-title h3 mb-0 fw-bold">{value.toLocaleString()}</p>
                </div>
            </div>
        </div>
    );
}

export default StatCard;