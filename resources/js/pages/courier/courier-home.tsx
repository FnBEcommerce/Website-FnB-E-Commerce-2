import axios from "axios"
import { usePage } from "@inertiajs/react"
import { useState, useMemo } from "react"
import { UserCard } from "@/components/usercard"
import { Package, ChevronDown, X } from "lucide-react"

interface teleProps {
  users_id: number
  chat_id: number
  name: string
  languange_code: string
}

interface usersProps {
  id: number
  name: string
  email: string
  phone_number: string
  birth_date: Date
  gender: string
  street: string
  city: string
  state: string
  label: string
}

const App = () => {
  const { props } = usePage()
  const dataObj: teleProps[] = Array.isArray(props.data) ? props.data : []
  const usersDataObj: usersProps[] = Array.isArray(props.usersData) ? props.usersData : []

  // buat map user id -> user, memoized supaya tidak direcompute tiap render
  const userMap = useMemo(
    () => new Map<number, usersProps>(usersDataObj.map(user => [user.id, user])),
    [usersDataObj]
  )

  // --- tambahan untuk fitur pencarian ---
  const [query, setQuery] = useState<string>("")

  // filteredData cari berdasarkan:
  // - nama di data tele (d.name)
  // - nama user (user.name)
  // - email user (user.email)
  const filteredData = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return dataObj
    return dataObj.filter(d => {
      const user = userMap.get(d.users_id)
      const teleName = (d.name || "").toLowerCase()
      const userName = (user?.name || "").toLowerCase()
      const userEmail = (user?.email || "").toLowerCase()
      return teleName.includes(q) || userName.includes(q) || userEmail.includes(q)
    })
  }, [dataObj, userMap, query])
  // --- akhir tambahan pencarian ---

  const [type, setType] = useState('prepare')
  const [sendNote, setSendNote] = useState('Pesanan Akan Dikirim')

  const sendDataPrepare = async (id_chat: number, name: string, languange_code: string, note: string) => {
    try {
      await axios.post("/api/send-to-n8n-prepare", {
        chat_id: id_chat,
        name: name,
        note: note,
        languange_code: languange_code,
      })
      console.log("Data terkirim ke Laravel → n8n")
    } catch (error) {
      console.error("Gagal mengirim:", error)
    }
  }

  const sendDataMiddle = async (id_chat: number, name: string, languange_code: string, note: string) => {
    try {
      await axios.post("/api/send-to-n8n-middle", {
        chat_id: id_chat,
        name: name,
        note: note,
        languange_code: languange_code,
      })
      console.log("Data terkirim ke Laravel → n8n")
    } catch (error) {
      console.error("Gagal mengirim:", error)
    }
  }

  const sendDataDone = async (id_chat: number, name: string, languange_code: string, note: string) => {
    try {
      await axios.post("/api/send-to-n8n-done", {
        chat_id: id_chat,
        name: name,
        note: note,
        languange_code: languange_code,
      })
      console.log("Data terkirim ke Laravel → n8n")
    } catch (error) {
      console.error("Gagal mengirim:", error)
    }
  }

  const handleSend = (type: string, id_chat: number, name: string, languange_code: string, note: string) => {
    switch (type) {
      case 'prepare':
        return sendDataPrepare(id_chat, name, languange_code, note)
      case 'middle':
        return sendDataMiddle(id_chat, name, languange_code, note)
      case 'done':
        return sendDataDone(id_chat, name, languange_code, note)
    }
  }

  const handleTypeChange = (newType: string) => {
    setType(newType)
    switch (newType) {
      case 'prepare':
        setSendNote('Pesanan Akan Dikirim')
        break
      case 'middle':
        setSendNote('Pesananmu Ditengah Perjalanan')
        break
      case 'done':
        setSendNote('Pesananmu Sampaii!!, Selamat Menikmati')
        break
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'prepare':
        return 'Prepare Order'
      case 'middle':
        return 'Order In Transit'
      case 'done':
        return 'Order Delivered'
      default:
        return 'Select Type'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-[#FFF5F0]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#FF6900] to-[#FA2C36] text-white py-8 px-4 sm:px-6 lg:px-8 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-white">Order Management</h1>
              <p className="text-white/90 mt-1">Send order notifications to customers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Control Panel */}
        <div className="bg-white rounded-2xl shadow-sm border border-border p-6 mb-8">
          <div className="max-w-md">
            <label className="block text-gray-700 mb-3">
              Notification Type
            </label>
            <div className="relative">
              <select
                name="sendType"
                value={type}
                onChange={(e) => handleTypeChange(e.target.value)}
                className="w-full appearance-none bg-white border-2 border-gray-200 rounded-xl py-3 px-4 pr-10 focus:outline-none focus:border-[#FF6900] focus:ring-4 focus:ring-[#FF6900]/10 transition-all cursor-pointer hover:border-gray-300"
              >
                <option value="prepare">📦 Prepare - Order will be shipped</option>
                <option value="middle">🚚 Middle - Order in transit</option>
                <option value="done">✅ Done - Order delivered</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
            <div className="mt-4 p-4 bg-gradient-to-r from-[#FFF5F0] to-white rounded-xl border border-[#FF6900]/20">
              <p className="text-gray-600">
                <span className="text-gray-900">Message: </span>
                {sendNote}
              </p>
            </div>
          </div>
        </div>

        {/* Stats + Search */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8 items-center">
          <div className="col-span-2 bg-white rounded-xl shadow-sm border border-border p-6">
            <p className="text-gray-600 mb-1">Total Orders (filtered / total)</p>
            <p className="text-gray-900">{filteredData.length} / {dataObj.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-border p-6">
            <p className="text-gray-600 mb-1">Active Type</p>
            <p className="text-gray-900">{getTypeLabel(type)}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-border p-6">
            <p className="text-gray-600 mb-1">Total Users</p>
            <p className="text-gray-900">{usersDataObj.length}</p>
          </div>
        </div>

        {/* Search input */}
        <div className="max-w-2xl mb-6">
          <label className="block text-gray-700 mb-2">Cari berdasarkan nama atau email</label>
          <div className="relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Masukkan nama atau email..."
              className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 pr-10 focus:outline-none focus:border-[#FF6900] focus:ring-4 focus:ring-[#FF6900]/10 transition-all"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-gray-100"
                aria-label="Clear search"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            )}
          </div>
        </div>

        {/* User Cards Grid */}
        {filteredData.length > 0 ? (
          <div>
            <h2 className="text-gray-900 mb-6">Customer Orders</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredData.map((d) => {
                const user = userMap.get(d.users_id)
                return (
                  <UserCard
                    key={d.chat_id}
                    user={user ? { name: user.name, email: user.email } : undefined}
                    chatId={d.chat_id}
                    languageCode={d.languange_code}
                    sendType={type}
                    onSend={() => handleSend(type, d.chat_id, d.name, d.languange_code, sendNote)}
                  />
                )
              })}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-border p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-gray-900 mb-2">No Orders Found</h3>
            <p className="text-gray-500">Coba kata kunci lain atau kosongkan pencarian</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
