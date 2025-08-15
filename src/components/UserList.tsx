import { Mail, Shield, User, UserCheck } from 'lucide-react';
import React from 'react';

interface UserData {
  id: number;
  username: string;
  email: string;
  role: string;
}

interface UserListProps {
  users: UserData[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  const getRoleIcon = (role: string) => {
    return role === 'admin' ? (
      <Shield className="h-5 w-5 text-red-500" />
    ) : (
      <UserCheck className="h-5 w-5 text-blue-500" />
    );
  };

  const getRoleText = (role: string) => {
    return role === 'admin' ? 'Quản trị viên' : 'Người dùng';
  };

  const getRoleBadgeColor = (role: string) => {
    return role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Danh sách người dùng ({users.length})</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-gray-100 rounded-full p-3">
                <User className="h-8 w-8 text-gray-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{user.username}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  {getRoleIcon(user.role)}
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(
                      user.role
                    )}`}
                  >
                    {getRoleText(user.role)}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">{user.email}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {users.length === 0 && (
        <div className="text-center py-12">
          <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có người dùng nào</h3>
          <p className="text-gray-500">Danh sách người dùng sẽ hiển thị ở đây.</p>
        </div>
      )}
    </div>
  );
};

export default UserList;
