import React, { useState } from 'react';
import { UserPlus, Trash2 } from 'lucide-react';
import { useV3Store } from '../../../store/v3Store';
import { GlassCard } from '../../../components/v3/ui/GlassCard';
import { Button } from '../../../components/v3/ui/Button';

export const EmployeeManager: React.FC = () => {
  const { employees, addEmployee, removeEmployee, toggleAttendance, assignTaskToEmployee } = useV3Store();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState<'Event Director' | 'Lead Decorator' | 'Sound Specialist' | 'Lighting Architect' | 'Client Success'>('Lead Decorator');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [salary, setSalary] = useState(8000);

  // Task assignment form state
  const [selectedEmpId, setSelectedEmpId] = useState(employees[0]?.id || '');
  const [taskTitle, setTaskTitle] = useState('');
  const [taskPriority, setTaskPriority] = useState<'High' | 'Medium' | 'Low'>('High');

  const handleAddEmp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    addEmployee({
      name,
      role,
      email,
      phone: phone || '+1 (555) 000-0000',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      status: 'Active',
      salary,
      attendanceRate: 100,
      assignedEventsCount: 0,
      dailyTasks: []
    });

    setName('');
    setEmail('');
    setPhone('');
    setIsAddModalOpen(false);
  };


  const handleAssignTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim() || !selectedEmpId) return;
    assignTaskToEmployee(selectedEmpId, taskTitle, taskPriority);
    setTaskTitle('');
  };

  return (
    <div className="space-y-6 animate-fade-in font-inter">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-heading font-bold text-slate-100">Staff Roster &amp; Employee Operations</h2>
          <p className="text-xs text-slate-400">Track site attendance, assign daily Kanban tasks, manage monthly payroll &amp; performance.</p>
        </div>
        <Button variant="primary" size="md" onClick={() => setIsAddModalOpen(true)} icon={<UserPlus className="w-4 h-4" />}>
          Add New Employee
        </Button>
      </div>

      {/* Roster & Task Assignment Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Roster Cards */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-400">Active Staff Roster ({employees.length})</h3>
          <div className="space-y-3">
            {employees.map((emp) => (
              <GlassCard key={emp.id} hoverEffect={false} className="p-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-center gap-3">
                    <img src={emp.avatar} alt={emp.name} className="w-12 h-12 rounded-full object-cover border border-amber-500/30" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-bold text-slate-100">{emp.name}</h4>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                          {emp.role}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">{emp.email} • {emp.phone}</div>
                      <div className="flex items-center gap-4 text-xs text-slate-400 mt-2">
                        <span>Assigned Events: <strong className="text-slate-200">{emp.assignedEventsCount}</strong></span>
                        <span>Attendance: <strong className="text-emerald-400">{emp.attendanceRate}%</strong></span>
                        <span>Salary: <strong className="text-amber-400">${emp.salary.toLocaleString()}/mo</strong></span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleAttendance(emp.id)}
                      className={emp.status === 'On Event Site' ? 'border-purple-500/50 text-purple-300' : ''}
                    >
                      {emp.status}
                    </Button>

                    <button
                      onClick={() => removeEmployee(emp.id)}
                      className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 transition-colors"
                      title="Remove Staff"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Daily Tasks for this employee */}
                {emp.dailyTasks.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-slate-800 space-y-2 text-xs">
                    <div className="text-slate-400 font-semibold uppercase text-[10px]">Daily Tasks Kanban ({emp.dailyTasks.length})</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {emp.dailyTasks.map((t) => (
                        <div key={t.id} className="p-2 bg-slate-950/80 rounded border border-slate-800 flex items-center justify-between">
                          <span className="text-slate-200">{t.title}</span>
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-500/20 text-amber-300">{t.priority}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Task Assignment Box */}
        <div className="space-y-4">
          <GlassCard goldBorder hoverEffect={false} className="space-y-4">
            <h3 className="text-base font-heading font-semibold text-slate-100">Assign Work &amp; Daily Tasks</h3>
            <form onSubmit={handleAssignTask} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Select Staff Member</label>
                <select
                  value={selectedEmpId}
                  onChange={(e) => setSelectedEmpId(e.target.value)}
                  className="w-full glass-input p-2.5 rounded-lg bg-slate-900"
                >
                  {employees.map((e) => (
                    <option key={e.id} value={e.id} className="bg-slate-900">{e.name} ({e.role})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Task Title / Work Details</label>
                <input
                  type="text"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  placeholder="e.g. Inspect DMX trussing at Plaza Ballroom"
                  className="w-full glass-input p-2.5 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Priority Level</label>
                <select
                  value={taskPriority}
                  onChange={(e: any) => setTaskPriority(e.target.value)}
                  className="w-full glass-input p-2.5 rounded-lg bg-slate-900"
                >
                  <option value="High">High Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="Low">Low Priority</option>
                </select>
              </div>

              <Button type="submit" variant="primary" size="md" className="w-full">
                Assign Work Task
              </Button>
            </form>
          </GlassCard>
        </div>
      </div>

      {/* Add Employee Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-heading font-bold text-slate-100">Add New Employee</h3>
            <form onSubmit={handleAddEmp} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                  className="w-full glass-input p-2.5 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Role</label>
                <select
                  value={role}
                  onChange={(e: any) => setRole(e.target.value)}
                  className="w-full glass-input p-2.5 rounded-lg bg-slate-900"
                >
                  <option value="Event Director">Event Director</option>
                  <option value="Lead Decorator">Lead Decorator</option>
                  <option value="Sound Specialist">Sound Specialist</option>
                  <option value="Lighting Architect">Lighting Architect</option>
                  <option value="Client Success">Client Success</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@apexevents.com"
                  className="w-full glass-input p-2.5 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Phone</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 234-5678"
                  className="w-full glass-input p-2.5 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Monthly Salary ($)</label>
                <input
                  type="number"
                  value={salary}
                  onChange={(e) => setSalary(Number(e.target.value))}
                  className="w-full glass-input p-2.5 rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="ghost" size="sm" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm">
                  Save Employee
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
