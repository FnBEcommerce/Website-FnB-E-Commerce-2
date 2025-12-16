import axios from "axios"
import { usePage } from "@inertiajs/react"
import { useState, useMemo } from "react"
import { Package, ChevronDown, PlusCircle, Edit2, Trash2, X } from "lucide-react"

interface User {
  id: number
  name: string
  email: string
}

interface NotificationItem {
  id: number
  users_id: number
  title: string
  message: string
  created_at?: string
  updated_at?: string
  user?: User | null
}

const NotificationPage = () => {
  const { props } = usePage()
  const initData: NotificationItem[] = Array.isArray(props.dataNotification) ? props.dataNotification : []
  const usersData: User[] = Array.isArray(props.usersData) ? props.usersData : []

  const [notifications, setNotifications] = useState<NotificationItem[]>(initData)
  const [query, setQuery] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editing, setEditing] = useState<NotificationItem | null>(null)
  const [form, setForm] = useState({
    users_id: usersData[0]?.id ?? 0,
    title: "",
    message: ""
  })
  const [loading, setLoading] = useState(false)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return notifications
    return notifications.filter(n => {
      const userName = (n.user?.name || "").toLowerCase()
      const userEmail = (n.user?.email || "").toLowerCase()
      const title = (n.title || "").toLowerCase()
      const message = (n.message || "").toLowerCase()
      return userName.includes(q) || userEmail.includes(q) || title.includes(q) || message.includes(q)
    })
  }, [notifications, query])

  const openCreate = () => {
    setEditing(null)
    setForm({
      users_id: usersData[0]?.id ?? 0,
      title: "",
      message: ""
    })
    setIsModalOpen(true)
  }

  const openEdit = (item: NotificationItem) => {
    setEditing(item)
    setForm({
      users_id: item.users_id,
      title: item.title,
      message: item.message
    })
    setIsModalOpen(true)
  }

  const handleSubmit = async (e?: any) => {
    if (e) e.preventDefault()
    setLoading(true)
    try {
      if (editing) {
        const res = await axios.put(`/notifications/${editing.id}`, form)
        const updated: NotificationItem = res.data.data
        setNotifications(prev => prev.map(p => (p.id === updated.id ? updated : p)))
      } else {
        const res = await axios.post('/notifications', form)
        const created: NotificationItem = res.data.data
        setNotifications(prev => [created, ...prev])
      }
      setIsModalOpen(false)
    } catch (err: any) {
      console.error('request failed', err)
      alert(err?.response?.data?.message || 'Gagal menyimpan notifikasi')
    } finally {
      setLoading(false)
    }
  }
  const [deletingIds, setDeletingIds] = useState<number[]>([]);


  const handleDelete = async (id: number) => {
    if (!confirm('Hapus notifikasi ini?')) return;

    // guard: jangan double click
    if (deletingIds.includes(id)) return;

    setDeletingIds(prev => [...prev, id]);
    try {
      const res = await axios.delete(`/notifications/${id}`);
      // beberapa server mengembalikan 204 No Content — handle juga
      const success = res?.data?.success ?? (res.status === 200 || res.status === 204);
      if (success) {
        setNotifications(prev => prev.filter(p => p.id !== id));
        // optional: show small feedback
        // alert(res.data.message ?? 'Deleted');
      } else {
        alert(res?.data?.message ?? 'Gagal menghapus notifikasi');
      }
    } catch (err: any) {
      console.error('Delete failed:', err);
      const msg = err?.response?.data?.message || err?.message || 'Gagal menghapus (network/error)';
      alert(msg);
    } finally {
      setDeletingIds(prev => prev.filter(x => x !== id));
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-[#FFF5F0]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#FF6900] to-[#FA2C36] text-white py-8 px-4 sm:px-6 lg:px-8 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-white">Notifications</h1>
              <p className="text-white/90 mt-1">Manage in-app notifications for users</p>
            </div>
          </div>
          
        </div>
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats + Search */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6 items-center">
          <div className="col-span-2 bg-white rounded-xl shadow-sm border border-border p-6">
            <p className="text-gray-600 mb-1">Total Notifications (filtered / total)</p>
            <p className="text-gray-900">{filtered.length} / {notifications.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-border p-6">
            <p className="text-gray-600 mb-1">Total Users</p>
            <p className="text-gray-900">{usersData.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-border p-6">
            <label className="block text-sm text-gray-600 mb-2">Search</label>
            <div className="relative">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari title / message / user..."
                className="w-full bg-white border border-gray-200 rounded-xl py-2 px-3 pr-10 focus:outline-none focus:border-[#FF6900] focus:ring-4 focus:ring-[#FF6900]/10"
              />
              {query && (
                <button onClick={() => setQuery("")} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100">
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div>
            <h2 className="text-gray-900 mb-6">Notification List</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(item => {
                const isDeleting = deletingIds.includes(item.id);
                return(
                
                <div key={item.id} className="bg-white rounded-xl shadow-sm border border-border p-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-gray-900 font-semibold">{item.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{item.message}</p>
                      <p className="text-xs text-gray-500 mt-3">
                        Untuk: <span className="text-gray-800">{item.user?.name ?? 'Unknown'}</span> • {item.user?.email ?? '-'}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">{item.created_at ? new Date(item.created_at).toLocaleString() : ''}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      
                      <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 rounded-md hover:bg-red-50"
                          disabled={isDeleting}
                          title={isDeleting ? 'Deleting...' : 'Delete'}
                        >
                          <Trash2 className={`w-4 h-4 ${isDeleting ? 'text-gray-400' : 'text-red-500'}`} />
                        </button>
                    </div>
                  </div>
                </div>
              )})}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-border p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-gray-900 mb-2">No Notifications</h3>
            <p className="text-gray-500">Buat notifikasi baru menggunakan tombol Create</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setIsModalOpen(false)} />
          <form onSubmit={handleSubmit} className="relative z-10 w-full max-w-2xl bg-white rounded-2xl p-6 shadow-lg border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{editing ? 'Edit Notification' : 'Create Notification'}</h3>
              <button type="button" onClick={() => setIsModalOpen(false)} className="p-1 rounded-full hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <label className="text-sm text-gray-600">User</label>
              <select
                value={form.users_id}
                onChange={(e) => setForm(prev => ({ ...prev, users_id: Number(e.target.value) }))}
                className="w-full bg-white border border-gray-200 rounded-xl py-2 px-3"
              >
                {usersData.map(u => (
                  <option key={u.id} value={u.id}>{u.name} — {u.email}</option>
                ))}
              </select>

              <label className="text-sm text-gray-600">Title</label>
              <input
                value={form.title}
                onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
                className="w-full bg-white border border-gray-200 rounded-xl py-2 px-3"
                required
              />

              <label className="text-sm text-gray-600">Message</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm(prev => ({ ...prev, message: e.target.value }))}
                className="w-full bg-white border border-gray-200 rounded-xl py-2 px-3 h-32"
                required
              />
            </div>

            <div className="mt-4 flex justify-end gap-3">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-xl border hover:bg-gray-50">
                Cancel
              </button>
              <button type="submit" disabled={loading} className="px-4 py-2 rounded-xl bg-[#FF6900] text-white">
                {loading ? 'Saving...' : (editing ? 'Save Changes' : 'Create')}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default NotificationPage
