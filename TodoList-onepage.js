import { useState } from "react";

export default function App() {
  // 1. STATE MANAGEMENT
  const [tasks, setTasks] = useState([
    { id: 1, text: "Belajar konsep React komponen", isCompleted: false },
    { id: 2, text: "Mencoba integrasi Tailwind CSS", isCompleted: true },
  ]);
  const [inputTask, setInputTask] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // State Tambahan untuk Fitur Edit
  const [editingId, setEditingId] = useState(null); // Menyimpan ID task yang sedang diedit
  const [editingText, setEditingText] = useState(""); // Menyimpan teks perubahan saat edit

  // 2. LOGIC FUNCTIONS
  // Fungsi Tambah Task
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!inputTask.trim()) return;
    
    const newTask = {
      id: Date.now(),
      text: inputTask,
      isCompleted: false,
    };
    
    setTasks([...tasks, newTask]);
    setInputTask(""); 
  };

  // Fungsi Toggle Checkbox (Done / Active)
  const toggleTaskStatus = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  // ==========================================
  // FITUR BARU: FUNGSI DELETE & EDIT
  // ==========================================
  
  // Fungsi Hapus Task
  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Fungsi Aktifkan Mode Edit (Mengisi input edit dengan teks asal)
  const handleStartEdit = (id, currentText) => {
    setEditingId(id);
    setEditingText(currentText);
  };

  // Fungsi Simpan Hasil Edit
  const handleSaveEdit = (id) => {
    if (!editingText.trim()) return;
    
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: editingText } : task
      )
    );
    setEditingId(null); // Keluar dari mode edit
    setEditingText("");
  };

  // Fungsi Batalkan Edit
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingText("");
  };
  // ==========================================

  // 3. FILTERING LOGIC
  const totalTasks = tasks.length;
  const activeTasksCount = tasks.filter((t) => !t.isCompleted).length;
  const completedTasksCount = tasks.filter((t) => t.isCompleted).length;

  const filteredTasks = tasks.filter((task) => {
    if (activeTab === "active") return !task.isCompleted;
    if (activeTab === "completed") return task.isCompleted;
    return true; 
  });

  // 4. RENDERING UI
  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-12">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center">React Todo List</h1>

        {/* 3 Cardbox Stat */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-blue-500 text-white p-4 rounded-xl shadow-sm text-center">
            <p className="text-sm opacity-80">All Task</p>
            <p className="text-2xl font-bold">{totalTasks}</p>
          </div>
          <div className="bg-amber-500 text-white p-4 rounded-xl shadow-sm text-center">
            <p className="text-sm opacity-80">Active</p>
            <p className="text-2xl font-bold">{activeTasksCount}</p>
          </div>
          <div className="bg-emerald-500 text-white p-4 rounded-xl shadow-sm text-center">
            <p className="text-sm opacity-80">Done</p>
            <p className="text-2xl font-bold">{completedTasksCount}</p>
          </div>
        </div>

        {/* Input Task */}
        <form onSubmit={handleAddTask} className="flex gap-2">
          <input
            type="text"
            placeholder="Tambah tugas baru..."
            value={inputTask}
            onChange={(e) => setInputTask(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Tambah
          </button>
        </form>

        {/* Tab All, Active, Completed */}
        <div className="flex border-b border-gray-200">
          {["all", "active", "completed"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 text-sm font-medium capitalize border-b-2 transition ${
                activeTab === tab
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tampilan List Task */}
        <div className="bg-white rounded-xl shadow-sm p-4 divide-y divide-gray-100">
          {filteredTasks.length === 0 ? (
            <p className="text-center text-gray-400 py-4">Tidak ada tugas disini.</p>
          ) : (
            filteredTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between py-3 gap-4">
                
                {/* JIKA SEDANG MODE EDIT */}
                {editingId === task.id ? (
                  <div className="flex items-center gap-2 flex-1">
                    <input
                      type="text"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      className="flex-1 px-3 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    />
                    <button
                      onClick={() => handleSaveEdit(task.id)}
                      className="text-xs bg-emerald-500 text-white px-3 py-1.5 rounded hover:bg-emerald-600 font-medium"
                    >
                      Simpan
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="text-xs bg-gray-400 text-white px-3 py-1.5 rounded hover:bg-gray-500 font-medium"
                    >
                      Batal
                    </button>
                  </div>
                ) : (
                  /* TAMPILAN NORMAL (TIDAK EDIT) */
                  <>
                    <div className="flex items-center gap-3 flex-1">
                      <input
                        type="checkbox"
                        checked={task.isCompleted}
                        onChange={() => toggleTaskStatus(task.id)}
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                      />
                      <span
                        className={`text-gray-700 break-all ${
                          task.isCompleted ? "line-through text-gray-400" : ""
                        }`}
                      >
                        {task.text}
                      </span>
                    </div>
                    
                    {/* Tombol Aksi Edit & Delete */}
                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => handleStartEdit(task.id, task.text)}
                        className="text-xs text-blue-600 hover:text-blue-800 font-medium bg-blue-50 hover:bg-blue-100 px-2.5 py-1.5 rounded transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="text-xs text-rose-600 hover:text-rose-800 font-medium bg-rose-50 hover:bg-rose-100 px-2.5 py-1.5 rounded transition"
                      >
                        Hapus
                      </button>
                    </div>
                  </>
                )}

              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
