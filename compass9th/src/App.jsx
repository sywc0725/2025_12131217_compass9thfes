import React, { useState, useEffect } from 'react';
import { 
  Plane, MapPin, ShoppingBag, Train, 
  Sun, CloudSun, CheckSquare, Plus, Trash2, Heart, 
  Utensils, Edit2, X, Save, Bus, BedDouble, ArrowRight,
  Briefcase, Luggage, GripVertical, GalleryVertical, Loader,
  Gift, BookOpen, Shirt, PawPrint, Popcorn, Wallet, Candy, Cake, Coffee 
} from 'lucide-react';

// --- 初始資料設定 ---

const WEATHER_FORECAST = [
  { date: '12/13 (五)', temp: '6°C - 13°C', condition: '晴時多雲', icon: 'Sun' },
  { date: '14 (六)', temp: '5°C - 12°C', condition: '多雲', icon: 'CloudSun' },
  { date: '12/15 (日)', temp: '4°C - 11°C', condition: '晴朗', icon: 'Sun' },
  { date: '12/16 (一)', temp: '5°C - 12°C', condition: '晴時多雲', icon: 'CloudSun' },
  { date: '12/17 (二)', temp: '6°C - 13°C', condition: '晴朗', icon: 'Sun' },
];

const INITIAL_PACKING_ITEMS = [
  // --- 手持行李 (Carry-on) ---
  { id: 'd1', text: '護照 (正本+影本)', category: '文件/證件', luggage: 'carryOn', checked: false },
  { id: 'd2', text: 'VJW (QR Code 截圖)', category: '文件/證件', luggage: 'carryOn', checked: false },
  { id: 'd3', text: '西瓜卡 / 交通票券', category: '文件/證件', luggage: 'carryOn', checked: false },
  { id: 'd4', text: '日幣現金 (分裝) & 信用卡', category: '文件/證件', luggage: 'carryOn', checked: false },
  
  { id: 'e1', text: '手機 + 充電線', category: '電子產品', luggage: 'carryOn', checked: false },
  { id: 'e2', text: '行動電源 (必備/不能托運)', category: '電子產品', luggage: 'carryOn', checked: false },
  { id: 'e3', text: 'Wifi 機 / SIM 卡 (+取卡針)', category: '電子產品', luggage: 'carryOn', checked: false },
  
  { id: 'c1', text: '外套/輕薄羽絨 (飛機保暖)', category: '衣物/配件', luggage: 'carryOn', checked: false },
  { id: 'c2', text: '保暖圍巾/手套', category: '衣物/配件', luggage: 'carryOn', checked: false },

  { id: 't1', text: '牙刷牙膏 (旅行裝)', category: '個人用品', luggage: 'carryOn', checked: false },
  { id: 't2', text: '保濕護唇膏/護手霜', category: '個人用品', luggage: 'carryOn', checked: false },

  { id: 'm1', text: '常備藥品 (止痛藥/感冒藥)', category: '藥品/急救', luggage: 'carryOn', checked: false },
  { id: 'o1', text: 'U型枕 / 眼罩', category: '其他必需品', luggage: 'carryOn', checked: false },
  { id: 'o2', text: '筆 (填入境卡)', category: '其他必需品', luggage: 'carryOn', checked: false },

  // --- 托運行李 (Checked) ---
  { id: 'c10', text: '厚外套 / 大衣 (防風)', category: '衣物/配件', luggage: 'checked', checked: false },
  { id: 'c11', text: '發熱衣 / 內搭 (每天換)', category: '衣物/配件', luggage: 'checked', checked: false },
  { id: 'c12', text: '外衣 / 針織衫', category: '衣物/配件', luggage: 'checked', checked: false },
  { id: 'c13', text: '好走的球鞋 / 襪子', category: '衣物/配件', luggage: 'checked', checked: false },
  { id: 'c14', text: '免洗內褲', category: '衣物/配件', luggage: 'checked', checked: false },

  { id: 'e10', text: '轉接頭 / 延長線', category: '電子產品', luggage: 'checked', checked: false },
  { id: 'e11', text: '相機及備用電池', category: '電子產品', luggage: 'checked', checked: false },

  { id: 't10', text: '液體保養品 (>100ml) / 化妝品', category: '個人用品', luggage: 'checked', checked: false },
  { id: 't11', text: '洗面乳 / 卸妝油', category: '個人用品', luggage: 'checked', checked: false },
  { id: 't12', text: '梳子 / 髮圈', category: '個人用品', luggage: 'checked', checked: false },
  
  { id: 'o10', text: '折疊購物袋 / 備用小包', category: '其他必需品', luggage: 'checked', checked: false },
  { id: 'o11', text: '壓縮袋 (裝戰利品)', category: '其他必需品', luggage: 'checked', checked: false },
  { id: 'o12', text: '雨傘 (折疊)', category: '其他必需品', luggage: 'checked', checked: false },
];

const INITIAL_SHOPPING_ITEMS = [
    { id: 's1', name: 'Chiikawa 絨毛吊飾 (小八)', shop: '池袋 Park', price: '3200', icon: 'Heart', bought: false },
    { id: 's2', name: '限定聯名餅乾', shop: '東京車站一番街', price: '1500', icon: 'Utensils', bought: true },
    { id: 's3', name: '可愛文具組', shop: 'Kiddy Land', price: '1800', icon: 'BookOpen', bought: false },
];


const INITIAL_ITINERARY = [
  {
    day: 'DAY 1',
    date: '12/13 (五)',
    title: '抵達 & 幕張活動',
    events: [
      { 
        id: 'd1-1', time: '06:35', icon: 'Plane', title: '抵達 成田機場 (NRT)', 
        desc: '入境手續、領取行李。',
        links: []
      },
      { 
        id: 'd1-2', time: '08:00', icon: 'Bus', title: '交通：京成巴士往幕張', 
        desc: '1. 入境後到 1樓入境大廳 南口/北口尋找「京成巴士 (Keisei Bus)」櫃台。\n2. 購買往「幕張新都心・千葉」方向車票 (約¥1000-1200)。\n3. 詢問櫃台最近的一班車在哪個站牌 (通常是 6號 或 12號)。\n4. 下車站：直接搭到您預定的飯店附近「海濱幕張站」或飯店名稱。\n5. 車程約 40-50 分鐘，免轉車。',
        links: [{ name: '京成巴士時刻表參考', url: 'https://honyaku.j-server.com/LUCKEISEIB/ns/tl.cgi/https://www.keiseibus.co.jp/kousoku/nrt10.html?SLANG=ja&TLANG=zh&XMODE=0&XCHARSET=utf-8&XJSID=0' }]
      },
      { 
        id: 'd1-3', time: '09:40', icon: 'MapPin', title: '飯店 Check-in / 寄放行李', 
        desc: '地址：2-chōme-3 Hibino, Mihama Ward, Chiba (APA Hotel & Resort)',
        links: [{ name: '飯店導航', url: 'https://maps.app.goo.gl/SL2AjLa5uLhALiUEA?g_st=ipc' }]
      },
      { 
        id: 'd1-4', time: '11:30', icon: 'Utensils', title: '午餐推薦 (幕張 Outlet)', 
        desc: '建議在三井 Outlet 或車站附近用餐：\n1. Maison Kayser (好吃的麵包輕食)\n2. Tina\'s Espresso & Bar (咖啡簡餐)\n3. 牛たん伊之助 (牛舌定食，位於 Outlet 2F)',
        links: [
          { name: 'Maison Kayser', url: 'https://maps.app.goo.gl/MakuhariMaison' },
          { name: 'Tina\'s Espresso', url: 'https://maps.app.goo.gl/MakuhariTina' },
          { name: '牛たん伊之助', url: 'https://maps.app.goo.gl/MakuhariGyutan' }
        ]
      },
      { 
        id: 'd1-5', time: '13:30', icon: 'GalleryVertical', title: '幕張國際展示場 活動開始', 
        desc: '參加活動！請走空橋前往，約 10 分鐘路程。',
        links: [{ name: '幕張展覽館地圖', url: 'https://maps.app.goo.gl/9QwQkPqXqXqXqXqX' }]
      },
      { 
        id: 'd1-6', time: '18:30', icon: 'Utensils', title: '晚餐推薦 (海濱幕張)', 
        desc: '活動結束後慶祝一下：\n1. 貴闘炎 (厚切燒肉，氣氛佳)\n2. 燒肉 TORAJI (高品質連鎖)\n3. Kanazawa Maimon Sushi (迴轉壽司，就在車站旁)',
        links: [
          { name: '貴闘炎 海浜幕張店', url: 'https://maps.app.goo.gl/TakatoenMakuhari' },
          { name: '燒肉 TORAJI', url: 'https://maps.app.goo.gl/TorajiMakuhari' },
          { name: '金澤美味壽司', url: 'https://maps.app.goo.gl/KanazawaSushi' }
        ]
      }
    ]
  },
  {
    day: 'DAY 2',
    date: '12/14 (六)',
    title: '全日活動 & 移動池袋',
    events: [
      { id: 'd2-1', time: '06:00', icon: 'GalleryVertical', title: '幕張展覽館 活動開始', desc: '早餐吃簡單輕食。寄放行李。', links: [] },
      { id: 'd2-2', time: '20:30', icon: 'Train', title: '移動：幕張 → 池袋', desc: '路線：JR 京葉線 (往東京) → 新木場站轉乘 → 地鐵有樂町線 (往和光市) → 東池袋站 (直通飯店)。', links: [] },
      { id: 'd2-3', time: '22:00', icon: 'BedDouble', title: 'Check-in 太陽城王子飯店', desc: 'Sunshine City Prince Hotel', links: [{ name: '飯店導航', url: 'https://maps.app.goo.gl/SunshineCityPrince' }] },
      { 
        id: 'd2-4', time: '22:30', icon: 'Utensils', title: '晚餐 / 宵夜 (池袋)', 
        desc: '這時間很多店關了，推薦：\n1. 無敵家 (排隊拉麵，開到很晚)\n2. 一蘭 池袋店 (24H)\n3. 鳥貴族 (連鎖平價串燒，開到凌晨，推薦!!)\n4. 秋吉 串燒 (福井名店，池袋也有)',
        links: [
          { name: '無敵家拉麵', url: 'https://maps.app.goo.gl/Mutekiya' },
          { name: '一蘭 池袋', url: 'https://maps.app.goo.gl/IchiranIkebukuro' },
          { name: '鳥貴族 池袋東口店', url: 'https://maps.app.goo.gl/TorikizokuIkebukuro' },
          { name: '秋吉串燒 池袋店', url: 'https://maps.app.goo.gl/AkiyoshiIkebukuro' }
        ]
      }
    ]
  },
  {
    day: 'DAY 3',
    date: '12/15 (日)',
    title: '池袋吉伊卡哇主場 & 澀谷原宿',
    events: [
      { 
        id: 'd3-1', time: '10:00', icon: 'Heart', title: '吉伊卡哇 Park (池袋主場)', 
        desc: '地點：〒170-0013 東京都豊島区東池袋３丁目３−5 サンシャインシティ アネックス B1・1F。\n飯店（太陽城王子）就在旁邊，步行即可抵達，非常方便！建議提前去排隊。',
        links: [{ name: 'Park 地點 (Sunshine City Annex)', url: 'https://maps.app.goo.gl/v6yN7LzFj3P4J2V97' }]
      },
      { 
        id: 'd3-2', time: '11:30', icon: 'Train', title: '交通：池袋 → 澀谷', 
        desc: '1. 在 JR 池袋站 搭乘【JR 山手線】(外回) 或【湘南新宿線】。\n2. 或者搭乘【地鐵副都心線 (Fukutoshin Line)】。\n3. 車程約 10-15 分鐘，直達澀谷，準備吃拉麵！',
        links: []
      },
      { 
        id: 'd3-3', time: '12:10', icon: 'Utensils', title: '澀谷 PARCO 行程', 
        desc: '午餐：吉伊卡哇拉麵 (需預約/整理券)。\n備案：極味や (漢堡排) 或 澀谷橫丁。\n逛街：Nintendo Tokyo, Jump Shop, Pokemon Center。',
        links: [
          { name: '澀谷 PARCO', url: 'https://maps.app.goo.gl/ShibuyaParco' },
          { name: '極味や 澀谷', url: 'https://maps.app.goo.gl/KiwamiyaShibuya' } 
        ]
      },
      { 
        id: 'd3-4', time: '16:30', icon: 'ShoppingBag', title: '原宿 / 表參道', 
        desc: '步行前往原宿。\n1. 吉伊卡哇麵包店 (表參道)\n2. Kiddy Land 原宿店 (必逛玩具店)',
        links: [
          { name: 'Kiddy Land 原宿', url: 'https://maps.app.goo.gl/KiddyLandHarajuku' },
          { name: '吉伊卡哇麵包店', url: 'https://maps.app.goo.gl/ChiikawaBakery' }
        ]
      },
      { 
        id: 'd3-5', time: '19:00', icon: 'Utensils', title: '晚餐推薦 (分流)', 
        desc: '【若在 原宿 吃】：\n1. AFURI 原宿 (柚子鹽拉麵)\n2. Red Rock (烤牛肉丼)\n\n【若去 東京車站 吃】：\n1. 根岸 (Negishi) 牛舌 (八重洲口)\n2. 斑鳩拉麵 (拉麵一番街)\n3. 電光石火 (廣島燒)',
        links: [
          { name: 'AFURI 原宿', url: 'https://maps.app.goo.gl/AfuriHarajuku' },
          { name: 'Red Rock 原宿', url: 'https://maps.app.goo.gl/RedRockHarajuku' },
          { name: '根岸牛舌 東京站', url: 'https://maps.app.goo.gl/NegishiTokyo' },
          { name: '斑鳩拉麵', url: 'https://maps.app.goo.gl/IkarugaTokyo' }
        ]
      },
      { 
        id: 'd3-6a', time: '21:00', icon: 'Train', title: '回池袋 (從 東京車站)', 
        desc: '搭乘 JR 山手線 或 地鐵丸之內線回池袋 (約 25 分鐘)。',
        links: []
      },
      { 
        id: 'd3-6b', time: '21:00', icon: 'Train', title: '回池袋 (從 原宿)', 
        desc: '搭乘 JR 山手線 直達池袋 (約 15 分鐘)。',
        links: []
      },
      { 
        id: 'd3-7', time: '21:30', icon: 'ShoppingBag', title: '夜間採買 (池袋)', 
        desc: '1. 唐吉訶德 池袋東口站前店 (24H)\n2. 松本清 池袋東口店\n3. Sun Drug 池袋東口店',
        links: [
          { name: '唐吉訶德 池袋東口 (24H)', url: 'https://maps.app.goo.gl/DonkiIkebukuro' },
          { name: '松本清 池袋東口店', url: 'https://maps.app.goo.gl/MatsukiyoIkebukuro' }
        ]
      }
    ]
  },
  {
    day: 'DAY 4',
    date: '12/16 (一)',
    title: '太陽城 & 購物',
    events: [
      { 
        id: 'd4-1', time: '10:30', icon: 'Utensils', title: '早午餐推薦 (池袋)', 
        desc: '1. 藏壽司 池袋旗艦店 (裝潢很美，可以試試)\n2. 幸福鬆餅 (A Happy Pancake) 池袋店 (甜點愛好者)\n3. 客美多咖啡 (Komeda\'s Coffee) (日式連鎖早餐)',
        links: [
          { name: '藏壽司 池袋旗艦店', url: 'https://maps.app.goo.gl/LMBWeBF8QpXPQ9Ft6?g_st=ipc' },
          { name: '幸福鬆餅 池袋', url: 'https://maps.app.goo.gl/HappyPancake' }
        ]
      },
      { 
        id: 'd4-2', time: '12:30', icon: 'ShoppingBag', title: '太陽城 深度遊', 
        desc: '預計逛 5 小時：水族館、寶可夢中心、Gashapon (扭蛋) 百貨。',
        links: [{ name: 'Sunshine City', url: 'https://maps.app.goo.gl/SunshineCity' }]
      },
      { 
        id: 'd4-3', time: '18:00', icon: 'Utensils', title: '晚餐推薦 (分流)', 
        desc: '【池袋週邊】：\n1. 牛かつ もと村 (炸牛排)\n2. 敘敘苑 (太陽城高樓層燒肉)\n\n【東京車站】：\n1. 利久牛舌\n2. 六厘舍 (沾麵名店)',
        links: [
          { name: '炸牛排 本村 池袋店', url: 'https://maps.app.goo.gl/MotomuraIkebukuro' },
          { name: '敘敘苑 太陽城店', url: 'https://maps.app.goo.gl/JojoenSunshine' },
          { name: '利久牛舌 東京站', url: 'https://maps.app.goo.gl/RikyuTokyo' }
        ]
      },
      { id: 'd4-4', time: '21:00', icon: 'ShoppingBag', title: '最後補貨 & 打包', desc: '利用最後時間去超商或唐吉訶德補齊沒買到的東西。', links: [] }
    ]
  },
  {
    day: 'DAY 5',
    date: '12/17 (二)',
    title: '返台 & Skyliner',
    events: [
      { id: 'd5-1', time: '11:00', icon: 'ShoppingBag', title: 'Check-out & 最後一逛', desc: '行李寄放櫃台。去 Animate 池袋總店 或 西武百貨買伴手禮。', links: [] },
      { id: 'd5-2', time: '12:30', icon: 'CheckSquare', title: '回飯店拿行李', desc: '準備出發去機場。', links: [] },
      { 
        id: 'd5-3', time: '13:00', icon: 'Train', title: '交通：池袋 → 日暮里 (JR)', 
        desc: '1. 在 JR 池袋站 搭乘【JR 山手線】(外回，往上野/東京方向)。\n2. 車程約 12-15 分鐘。\n3. 在「日暮里站」下車。',
        links: []
      },
      { 
        id: 'd5-4', time: '13:20', icon: 'Train', title: '轉乘 Skyliner (已購票)', 
        desc: '1. 在日暮里站內，依指示前往「京成電鐵 (Keisei)」轉乘改札口。\n2. 使用您買好的 Skyliner 車票 (或兌換券)。\n3. 搭乘 Skyliner 前往成田機場 (約 36 分鐘)。',
        links: []
      },
      { id: 'd5-5', time: '14:10', icon: 'Plane', title: '抵達 成田機場', desc: '前往出境大廳。', links: [] },
      { id: 'd5-6', time: '17:15', icon: 'Plane', title: '飛機起飛', desc: 'Home Sweet Home!' }
    ]
  }
];

// --- 元件區域 ---

const IconMap = {
  Plane, MapPin, ShoppingBag, Train, 
  Sun, CloudSun, CheckSquare, Plus, Trash2, Heart, 
  Utensils, Edit2, X, Save, Bus, BedDouble, ArrowRight,
  Briefcase, Luggage, GripVertical, GalleryVertical, Loader,
  Gift, BookOpen, Shirt, PawPrint, Popcorn, Wallet, Candy, Cake, Coffee 
};

const CATEGORIES = [
  { value: '文件/證件', label: '文件/證件' },
  { value: '電子產品', label: '電子產品' },
  { value: '衣物/配件', label: '衣物/配件' },
  { value: '個人用品', label: '個人用品' },
  { value: '藥品/急救', label: '藥品/急救' },
  { value: '其他必需品', label: '其他必需品' },
];

const LUGGAGE_TYPES = [
  { value: 'carryOn', label: '手持行李 (Carry-on)' },
  { value: 'checked', label: '托運行李 (Checked)' },
];

// 可用於行程事件的圖標列表
const ITINERARY_ICONS = [
    'Plane', 'MapPin', 'ShoppingBag', 'Train', 'Utensils', 
    'BedDouble', 'Bus', 'Heart', 'GalleryVertical', 'Briefcase'
];

// 可用於購物清單的圖標列表
const SHOPPING_ICONS = [
  'Heart', 'ShoppingBag', 'Gift', 'Utensils', 'BookOpen', 'Shirt', 'PawPrint', 
  'Popcorn', 'Wallet', 'Candy', 'Cake', 'Coffee' 
];


/**
 * 編輯/新增購物清單項目的 Modal (已修正刪除邏輯和確認訊息)
 */
const ShoppingEditorModal = ({ item, onClose, onSave, onDelete }) => {
    // 檢查 item 是否為空或是一個用於新增的空物件，如果沒有 ID 則視為新增
    const isNew = !item || !item.id; 
    const [formData, setFormData] = useState(item || { 
        name: '', 
        shop: '', 
        price: '', 
        icon: SHOPPING_ICONS[0], 
        bought: false 
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        if (!formData.name) return;
        setLoading(true);
        
        const savedItem = {
            id: item?.id, // 編輯時使用舊 ID，新增時傳 undefined/null
            name: formData.name,
            shop: formData.shop,
            price: formData.price,
            icon: formData.icon,
            bought: formData.bought
        };

        onSave(savedItem);
        setLoading(false);
        onClose();
    };

    // --- 刪除邏輯修正：移除 window.confirm ---
    const handleDeleteItem = () => {
        // 使用傳入的 item.id 確保刪除的是主清單中的項目
        if (!item || !item.id) {
            console.error("嘗試刪除沒有 ID 的項目");
            return; 
        }

        onDelete(item.id); 
        onClose();
    };
    // --- 結束刪除邏輯修正 ---

    const IconComp = IconMap[formData.icon];

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                <div className="bg-pink-400 p-4 text-white flex justify-between items-center">
                    <h3 className="font-bold flex items-center">{isNew ? <Plus size={18} className="mr-2"/> : <Edit2 size={18} className="mr-2"/>} {isNew ? '新增購物目標' : '編輯購物目標'}</h3>
                    <button onClick={onClose}><X size={24} /></button>
                </div>
                
                <div className="p-4 overflow-y-auto space-y-4">
                    
                    {/* 標題 */}
                    <div>
                        <label className="text-xs text-gray-500 font-bold block mb-1">商品名稱</label>
                        <input name="name" value={formData.name} onChange={handleChange} className="w-full bg-gray-50 p-3 rounded-lg border border-gray-200" placeholder="e.g. 吉伊卡哇絨毛吊飾" />
                    </div>

                    {/* 店家 & 價格 */}
                    <div className='flex gap-2'>
                        <div className='w-1/2'>
                            <label className="text-xs text-gray-500 font-bold block mb-1">店家/地點</label>
                            <input name="shop" value={formData.shop} onChange={handleChange} className="w-full bg-gray-50 p-3 rounded-lg border border-gray-200" placeholder="e.g. Parco 6F" />
                        </div>
                        <div className='w-1/2'>
                            <label className="text-xs text-gray-500 font-bold block mb-1">預算 (¥)</label>
                            <input name="price" value={formData.price} onChange={handleChange} className="w-full bg-gray-50 p-3 rounded-lg border border-gray-200" placeholder="e.g. 3200" />
                        </div>
                    </div>

                    {/* Icon 選擇器 */}
                    <div>
                        <label className="text-xs text-gray-500 font-bold block mb-2 flex items-center">
                            <span className='mr-2'>選擇圖標</span> 
                            <span className="text-pink-500 text-sm flex items-center"><IconComp size={16} className="mr-1"/> {formData.icon}</span>
                        </label>
                        <div className="flex flex-wrap gap-2 p-2 bg-gray-100 rounded-lg max-h-40 overflow-y-auto">
                            {SHOPPING_ICONS.map(iconName => {
                                const Icon = IconMap[iconName];
                                const isSelected = formData.icon === iconName;
                                return (
                                    <button
                                        key={iconName}
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, icon: iconName }))}
                                        className={`p-2 rounded-full transition-colors ${
                                            isSelected ? 'bg-pink-500 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-pink-100'
                                        }`}
                                        title={iconName}
                                    >
                                        <Icon size={20} />
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
  
                <div className="p-4 border-t border-gray-100 bg-gray-50 flex gap-2">
                    {!isNew && (
                        <button onClick={handleDeleteItem} className="w-1/3 bg-red-400 text-white py-3 rounded-xl font-bold shadow-md hover:bg-red-500 transition flex justify-center items-center">
                            <Trash2 size={18}/>
                        </button>
                    )}
                    <button onClick={handleSave} disabled={loading} className={`w-full bg-pink-500 text-white py-3 rounded-xl font-bold shadow-md hover:bg-pink-600 transition flex justify-center items-center ${isNew ? '' : 'w-2/3'}`}>
                        {loading ? <Loader className="animate-spin mr-2"/> : <Save size={18} className="mr-2"/>}
                        {isNew ? '新增目標' : '儲存修改'}
                    </button>
                </div>
            </div>
        </div>
    );
};


/**
 * 編輯/新增行程事件的 Modal (已修正刪除邏輯和確認訊息)
 */
const ItineraryEditorModal = ({ event, dayIndex, onClose, onSave, onDelete }) => {
    const isNew = !event || !event.id;
    // 修復：現在 links 是一個陣列，而非單一物件
    const [formData, setFormData] = useState({
      time: event?.time || 'HH:MM',
      title: event?.title || '',
      desc: event?.desc || '',
      icon: event?.icon || 'MapPin',
      links: event?.links || [], // 使用 links 陣列
      dayIndex: dayIndex,
    });
    const [loading, setLoading] = useState(false);
  
    // Handler for regular input fields (time, title, desc, icon)
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Handler for link input fields
    const handleLinkChange = (index, field, value) => {
        const newLinks = [...formData.links];
        // 確保連結物件存在
        newLinks[index] = {
            ...newLinks[index],
            [field]: value
        };
        setFormData(prev => ({ ...prev, links: newLinks }));
    };

    // Handler to add an empty link
    const handleAddLink = () => {
        setFormData(prev => ({
            ...prev,
            links: [...prev.links, { name: '', url: '' }]
        }));
    };

    // Handler to remove a link
    const handleRemoveLink = (index) => {
        const newLinks = formData.links.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, links: newLinks }));
    };
  
    const handleSave = () => {
      if (!formData.title || !formData.time) return;
      setLoading(true);
      
      // 清理連結：只保留名稱和網址都不為空的連結
      const cleanedLinks = formData.links.filter(link => 
        link.name.trim() !== '' && link.url.trim() !== ''
      );

      const savedEvent = {
        id: event?.id, // 編輯時使用舊 ID，新增時傳 undefined/null
        time: formData.time,
        title: formData.title,
        desc: formData.desc,
        icon: formData.icon,
        links: cleanedLinks
      };

      onSave(formData.dayIndex, savedEvent);
      setLoading(false);
      onClose();
    };
  
    // --- 刪除邏輯修正：移除 window.confirm ---
    const handleDeleteEvent = () => {
      // 使用傳入的 event.id 確保刪除的是主清單中的項目
      if (!event || !event.id) {
        console.error("嘗試刪除沒有 ID 的行程項目");
        return;
      }
      // 傳遞 dayIndex 和 event.id
      onDelete(formData.dayIndex, event.id);
      onClose();
    };
    // --- 結束刪除邏輯修正 ---
  
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
          <div className="bg-rose-400 p-4 text-white flex justify-between items-center">
            <h3 className="font-bold flex items-center">{isNew ? <Plus size={18} className="mr-2"/> : <Edit2 size={18} className="mr-2"/>} {isNew ? '新增行程活動' : '編輯行程活動'}</h3>
            <button onClick={onClose}><X size={24} /></button>
          </div>
          
          <div className="p-4 overflow-y-auto space-y-4">
            
            {/* 時間 & 圖標 */}
            <div className='flex gap-2'>
                <div className='w-1/3'>
                    <label className="text-xs text-gray-500 font-bold block mb-1">時間 (HH:MM)</label>
                    <input name="time" value={formData.time} onChange={handleChange} className="w-full bg-gray-50 p-3 rounded-lg border border-gray-200" placeholder="e.g. 13:30" />
                </div>
                <div className='w-2/3'>
                    <label className="text-xs text-gray-500 font-bold block mb-1">圖標</label>
                    <select name="icon" value={formData.icon} onChange={handleChange} className="w-full bg-gray-50 p-3 rounded-lg border border-gray-200">
                        {ITINERARY_ICONS.map(iconName => {
                            // eslint-disable-next-line no-unused-vars
                            const IconComp = IconMap[iconName];
                            return (
                                <option key={iconName} value={iconName}>
                                    {iconName}
                                </option>
                            );
                        })}
                    </select>
                </div>
            </div>

            {/* 標題 */}
            <div>
              <label className="text-xs text-gray-500 font-bold block mb-1">標題</label>
              <input name="title" value={formData.title} onChange={handleChange} className="w-full bg-gray-50 p-3 rounded-lg border border-gray-200" placeholder="e.g. 幕張國際展示場 活動" />
            </div>

            {/* 描述 */}
            <div>
              <label className="text-xs text-gray-500 font-bold block mb-1">描述/備註</label>
              <textarea name="desc" value={formData.desc} onChange={handleChange} className="w-full bg-gray-50 p-3 rounded-lg border border-gray-200 min-h-[80px]" placeholder="e.g. 攜帶門票、活動結束後直接前往海濱幕張車站搭車" />
            </div>
            
            {/* 連結 - 修復部分 */}
            <div>
                <label className="text-xs text-gray-500 font-bold block mb-2">相關連結 (地圖/網頁)</label>
                {formData.links.map((link, index) => (
                    <div key={index} className="flex gap-2 mb-3 items-end p-2 bg-gray-100 rounded-lg">
                        <div className="flex-grow space-y-1">
                            <input 
                                name={`linkName-${index}`} 
                                value={link.name} 
                                onChange={(e) => handleLinkChange(index, 'name', e.target.value)} 
                                className="w-full bg-white p-2 rounded-lg border border-gray-200 text-sm" 
                                placeholder="連結名稱 (e.g. 地圖)" 
                            />
                            <input 
                                name={`linkUrl-${index}`} 
                                value={link.url} 
                                onChange={(e) => handleLinkChange(index, 'url', e.target.value)} 
                                className="w-full bg-white p-2 rounded-lg border border-gray-200 text-sm" 
                                placeholder="網址 (URL)" 
                            />
                        </div>
                        <button 
                            type="button" 
                            onClick={() => handleRemoveLink(index)} 
                            className="p-2 text-red-400 hover:text-red-600 flex-shrink-0"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                ))}
                <button 
                    type="button" 
                    onClick={handleAddLink} 
                    className="w-full mt-2 flex items-center justify-center p-2 text-sm font-bold text-rose-500 border border-dashed border-rose-200 rounded-lg bg-rose-50/50 hover:bg-rose-100 transition-colors"
                >
                    <Plus size={16} className="mr-1"/> 新增連結
                </button>
            </div>
            {/* 連結 - 結束修復部分 */}
          </div>
  
          <div className="p-4 border-t border-gray-100 bg-gray-50 flex gap-2">
            {!isNew && (
              <button onClick={handleDeleteEvent} className="w-1/3 bg-red-400 text-white py-3 rounded-xl font-bold shadow-md hover:bg-red-500 transition flex justify-center items-center">
                <Trash2 size={18}/>
              </button>
            )}
            <button onClick={handleSave} disabled={loading} className={`w-full bg-rose-500 text-white py-3 rounded-xl font-bold shadow-md hover:bg-rose-600 transition flex justify-center items-center ${isNew ? '' : 'w-2/3'}`}>
              {loading ? <Loader className="animate-spin mr-2"/> : <Save size={18} className="mr-2"/>}
              {isNew ? '新增活動' : '儲存修改'}
            </button>
          </div>
        </div>
      </div>
    );
  };


/**
 * 編輯/新增清單項目的 Modal (已修正刪除邏輯和確認訊息)
 */
const ChecklistEditorModal = ({ item, onClose, onSave, onDelete }) => {
  const isNew = !item || !item.id;
  const [formData, setFormData] = useState(item || { text: '', category: CATEGORIES[0].value, luggage: LUGGAGE_TYPES[0].value, checked: false });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!formData.text) return;
    setLoading(true);
    
    const savedItem = {
      ...formData,
      id: item?.id, // 編輯時使用舊 ID，新增時傳 undefined/null
    };

    onSave(savedItem);
    setLoading(false);
  };

  // --- 刪除邏輯修正：移除 window.confirm ---
  const handleDeleteItem = () => {
    // 使用傳入的 item.id 確保刪除的是主清單中的項目
    if (!item || !item.id) {
        console.error("嘗試刪除沒有 ID 的清單項目");
        return; 
    }

    onDelete(item.id);
    onClose();
  };
  // --- 結束刪除邏輯修正 ---

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="bg-pink-400 p-4 text-white flex justify-between items-center">
          <h3 className="font-bold flex items-center">{isNew ? <Plus size={18} className="mr-2"/> : <Edit2 size={18} className="mr-2"/>} {isNew ? '新增清單項目' : '編輯清單項目'}</h3>
          <button onClick={onClose}><X size={24} /></button>
        </div>
        
        <div className="p-4 overflow-y-auto space-y-4">
          <div>
            <label className="text-xs text-gray-500 font-bold block mb-1">項目內容</label>
            <input name="text" value={formData.text} onChange={handleChange} className="w-full bg-gray-50 p-3 rounded-lg border border-gray-200" placeholder="e.g. 頸枕 / 摺疊袋" />
          </div>
          <div>
            <label className="text-xs text-gray-500 font-bold block mb-1">行李類型</label>
            <select name="luggage" value={formData.luggage} onChange={handleChange} className="w-full bg-gray-50 p-3 rounded-lg border border-gray-200">
              {LUGGAGE_TYPES.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500 font-bold block mb-1">分類</label>
            <select name="category" value={formData.category} onChange={handleChange} className="w-full bg-gray-50 p-3 rounded-lg border border-gray-200">
              {CATEGORIES.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="p-4 border-t border-gray-100 bg-gray-50 flex gap-2">
          {!isNew && (
            <button onClick={handleDeleteItem} className="w-1/3 bg-red-400 text-white py-3 rounded-xl font-bold shadow-md hover:bg-red-500 transition flex justify-center items-center">
              <Trash2 size={18}/>
            </button>
          )}
          <button onClick={handleSave} disabled={loading} className={`w-full bg-pink-500 text-white py-3 rounded-xl font-bold shadow-md hover:bg-pink-600 transition flex justify-center items-center ${isNew ? '' : 'w-2/3'}`}>
            {loading ? <Loader className="animate-spin mr-2"/> : <Save size={18} className="mr-2"/>}
            {isNew ? '新增' : '儲存修改'}
          </button>
        </div>
      </div>
    </div>
  );
};


/**
 * 單一分類列表元件 (保持不變)
 */
const ChecklistSection = ({ title, items, onToggle, onEdit }) => (
  <div className="mb-6">
    <h3 className="text-pink-600 font-bold mb-3 text-lg bg-pink-50 inline-block px-3 py-1 rounded-full">{title}</h3>
    <div className="bg-white rounded-2xl shadow-sm border border-pink-100 overflow-hidden">
      {items.map(item => (
        <div 
          key={item.id} 
          className={`p-4 border-b border-gray-100 last:border-0 flex items-center justify-between transition-colors ${item.checked ? 'bg-gray-50' : 'hover:bg-pink-50/30'}`}
        >
          <div className="flex items-center flex-grow" onClick={() => onToggle(item.id)}>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 transition-colors flex-shrink-0 ${item.checked ? 'bg-pink-400 border-pink-400' : 'border-gray-300'}`}>
              {item.checked && <CheckSquare className="w-4 h-4 text-white" />}
            </div>
            <span className={`text-sm ${item.checked ? 'text-gray-400 line-through' : 'text-gray-700'}`}>{item.text}</span>
          </div>
          <button onClick={() => onEdit(item)} className="ml-4 p-1 text-gray-300 hover:text-pink-500 transition-colors flex-shrink-0">
            <Edit2 size={14} />
          </button>
        </div>
      ))}
      {items.length === 0 && (
        <div className="text-center text-gray-400 py-4 text-sm">此分類尚無項目</div>
      )}
    </div>
  </div>
);


/**
 * 整理後的清單頁面 (Packing List Tab Content) (保持不變)
 */
const PackingListView = ({ packingItems, onToggle, onSave, onDelete, setEditingItem }) => {
  // 1. 依行李類型分組
  const carryOnItems = packingItems.filter(item => item.luggage === 'carryOn');
  const checkedItems = packingItems.filter(item => item.luggage === 'checked');

  // 2. 依分類標籤分組 (例如: 文件/衣物...)
  const groupByCategory = (items) => {
    return items.reduce((acc, item) => {
      acc[item.category] = acc[item.category] || [];
      acc[item.category].push(item);
      return acc;
    }, {});
  };

  const groupedCarryOn = groupByCategory(carryOnItems);
  const groupedChecked = groupByCategory(checkedItems);

  return (
    <div className="space-y-8 pb-10">
      <button 
        // 修復: 傳入一個空物件 {} 表示新增模式，讓 Modal 知道要開啟
        onClick={() => setEditingItem({})}
        className="w-full bg-pink-500 text-white py-3 rounded-xl font-bold hover:bg-pink-600 transition flex justify-center items-center shadow-md sticky top-0 z-20 mb-6"
      >
        <Plus className="w-5 h-5 mr-1"/> 新增項目
      </button>

      {/* 手持行李區塊 */}
      <div className="p-4 bg-white rounded-2xl shadow-lg border-t-4 border-pink-400">
        <h2 className="text-xl font-black text-pink-600 mb-4 flex items-center">
          <Briefcase className="mr-2" size={24}/> 手持行李 (Carry-on)
        </h2>
        {CATEGORIES.map(cat => {
          const items = groupedCarryOn[cat.value];
          // 只渲染有項目的分類
          return items && items.length > 0 ? (
            <ChecklistSection key={cat.value} title={cat.label} items={items} onToggle={onToggle} onEdit={setEditingItem} />
          ) : null;
        })}
      </div>

      {/* 托運行李區塊 */}
      <div className="p-4 bg-white rounded-2xl shadow-lg border-t-4 border-rose-400">
        <h2 className="text-xl font-black text-rose-600 mb-4 flex items-center">
          <Luggage className="mr-2" size={24}/> 托運行李 (Checked)
        </h2 >
        {CATEGORIES.map(cat => {
          const items = groupedChecked[cat.value];
          // 只渲染有項目的分類
          return items && items.length > 0 ? (
            <ChecklistSection key={cat.value} title={cat.label} items={items} onToggle={onToggle} onEdit={setEditingItem} />
          ) : null;
        })}
      </div>
    </div>
  );
};


/**
 * 購物清單頁面 (Shopping Tab Content) - 已修正新增邏輯
 */
const ShoppingList = ({ items, onToggleBought, onSetEditingItem, onDeleteItem }) => {
  
  // 依購買狀態排序，未買的在前
  const sortedItems = [...items].sort((a, b) => (a.bought === b.bought ? 0 : a.bought ? 1 : -1));

  return (
    <div className="space-y-6 pb-10">
      <button 
        // 修復: 傳入一個空物件 {} 表示新增模式，確保 state 會改變並開啟 Modal
        onClick={() => onSetEditingItem({})} 
        className="w-full bg-pink-500 text-white py-3 rounded-xl font-bold hover:bg-pink-600 transition flex justify-center items-center shadow-md sticky top-0 z-20 mb-6"
      >
        <Plus className="w-5 h-5 mr-1"/> 新增購物目標
      </button>
      
      {/* 購物項目列表 */}
      <div className="grid grid-cols-1 gap-3">
        {sortedItems.map(item => {
          const IconComp = IconMap[item.icon] || Heart;
          const isBought = item.bought;

          return (
            <div 
              key={item.id} 
              className={`bg-white p-4 rounded-2xl shadow-md flex items-center justify-between border-l-4 transition-all ${isBought ? 'border-gray-300 opacity-60' : 'border-pink-300 hover:shadow-lg'}`}
            >
              <div className="flex items-center space-x-3 flex-grow min-w-0">
                {/* Checkbox */}
                <div 
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0 cursor-pointer ${isBought ? 'bg-pink-400 border-pink-400' : 'border-gray-300 hover:bg-pink-50'}`}
                  onClick={() => onToggleBought(item.id)}
                >
                  {isBought && <CheckSquare className="w-4 h-4 text-white" />}
                </div>

                {/* Icon and Details */}
                <div className="flex items-center flex-grow min-w-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${isBought ? 'bg-gray-100 text-gray-400' : 'bg-pink-100 text-pink-600'}`}>
                    <IconComp size={18} />
                  </div>
                  <div className='min-w-0'>
                    <h4 className={`font-bold truncate ${isBought ? 'text-gray-500 line-through' : 'text-gray-800'}`}>{item.name}</h4>
                    <p className="text-xs text-gray-500 mt-1 flex items-center">
                      <Wallet size={12} className="mr-1 text-gray-400"/>
                      <span className="font-medium text-gray-600">¥ {item.price || '0'}</span> 
                      <span className="mx-1 text-gray-300">|</span>
                      {item.shop || '未指定店家'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Edit/Delete Buttons */}
              <div className='flex space-x-2 flex-shrink-0'>
                <button onClick={() => onSetEditingItem(item)} className="p-1 text-gray-300 hover:text-pink-500 transition-colors">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => onDeleteItem(item.id)} className="p-1 text-gray-300 hover:text-red-400 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
        {items.length === 0 && (
          <div className="text-center text-gray-400 py-10 bg-pink-50/50 rounded-2xl border-dashed border-2 border-pink-200">
            按下上方的按鈕，開始記錄您的吉伊卡哇戰利品目標！
          </div>
        )}
      </div>
    </div>
  );
};


/**
 * 行程詳細內容元件 (Itinerary Event) (保持不變)
 */
const ItineraryEvent = ({ event, dayIndex, onEdit }) => {
    const IconComp = IconMap[event.icon] || MapPin;
    return (
        <div key={event.id} className="relative group">
            <div className="absolute -left-[25px] bg-white text-rose-500 rounded-full p-1 border-2 border-rose-100 shadow-sm z-10">
                <IconComp size={16} />
            </div>
            
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 relative hover:shadow-md transition-shadow">
                {/* Edit Button */}
                <button 
                    onClick={() => onEdit(event, dayIndex)} 
                    className="absolute top-3 right-3 p-1 text-gray-300 hover:text-rose-500 transition-colors"
                >
                    <Edit2 size={16} />
                </button>

                <div className="text-rose-500 font-bold text-lg mb-1">{event.time}</div>
                <h4 className="font-bold text-gray-800 mb-2 pr-6">{event.title}</h4>
                <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed mb-3">{event.desc}</p>
                {event.links && event.links.length > 0 && (
                    <div className="mt-3 space-y-1">
                        {event.links.map((link, linkIdx) => (
                            <a 
                                key={linkIdx} 
                                href={link.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-xs text-blue-500 hover:text-blue-700 underline flex items-center"
                            >
                                <MapPin size={12} className="mr-1 flex-shrink-0"/>
                                {link.name}
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};


// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState('itinerary'); // Default to Itinerary
  const [expandedDayIndex, setExpandedDayIndex] = useState(2); // 預設展開 Day 3
  
  // State for Itinerary
  const [itinerary, setItinerary] = useState(() => {
    const saved = localStorage.getItem('chiikawa_itinerary_v5'); // Updated key
    return saved ? JSON.parse(saved) : INITIAL_ITINERARY;
  });
  
  // State for Packing Checklist
  const [packingItems, setPackingItems] = useState(() => {
    const saved = localStorage.getItem('chiikawa_packing_items_v5'); // Updated key
    return saved ? JSON.parse(saved) : INITIAL_PACKING_ITEMS;
  });

  // State for Shopping List
  const [shoppingItems, setShoppingItems] = useState(() => {
    const saved = localStorage.getItem('chiikawa_shopping_v5'); // Updated key
    return saved ? JSON.parse(saved) : INITIAL_SHOPPING_ITEMS;
  });

  const [editingChecklistItem, setEditingChecklistItem] = useState(null); // for Checklist editing
  const [editingItineraryEvent, setEditingItineraryEvent] = useState(null); // for Itinerary editing
  // 修復: 將新增模式改為傳入 {} 而非 null
  const [editingShoppingItem, setEditingShoppingItem] = useState(null); // for Shopping editing

  const [editingDayTitleIndex, setEditingDayTitleIndex] = useState(null);
  const [currentDayTitle, setCurrentDayTitle] = useState('');

  // Persistence
  useEffect(() => {
    localStorage.setItem('chiikawa_itinerary_v5', JSON.stringify(itinerary));
  }, [itinerary]);

  useEffect(() => {
    localStorage.setItem('chiikawa_packing_items_v5', JSON.stringify(packingItems));
  }, [packingItems]);

  useEffect(() => {
    localStorage.setItem('chiikawa_shopping_v5', JSON.stringify(shoppingItems));
  }, [shoppingItems]);


  // --- Handlers for Itinerary (已修正儲存 ID 邏輯) ---
  const handleToggleDay = (index) => {
    if (editingDayTitleIndex === index) return;
    setExpandedDayIndex(prevIndex => (prevIndex === index ? null : index));
  };

  const handleStartEditTitle = (index, title) => {
    setEditingDayTitleIndex(index);
    setCurrentDayTitle(title);
  };

  const handleSaveDayTitle = (index) => {
    // 移除 window.confirm，避免 iFrame 鎖定問題
    if (currentDayTitle.trim() === '') {
      // 簡單地防止儲存空白，如果真的要空白，用戶可以刪除
      console.warn("行程標題不能為空。");
      setEditingDayTitleIndex(null); // 取消編輯
      return;
    }
    
    setItinerary(prevItinerary => {
        const newItinerary = [...prevItinerary];
        newItinerary[index] = {
            ...newItinerary[index],
            title: currentDayTitle.trim()
        };
        return newItinerary;
    });

    setEditingDayTitleIndex(null);
    setCurrentDayTitle('');
  };

  const handleSaveEvent = (dayIndex, updatedEvent) => {
    setItinerary(prevItinerary => {
      const newItinerary = [...prevItinerary];
      const day = newItinerary[dayIndex];
      
      const eventId = updatedEvent.id || Date.now().toString(); // 確保新增時有 ID

      const eventIndex = day.events.findIndex(e => e.id === eventId); // 使用正確的 ID 查找

      if (eventIndex !== -1) {
        day.events[eventIndex] = { ...updatedEvent, id: eventId }; // 編輯
      } else {
        day.events.push({ ...updatedEvent, id: eventId }); // 新增
        day.events.sort((a, b) => a.time.localeCompare(b.time));
      }

      return newItinerary;
    });
    setEditingItineraryEvent(null); // 儲存後關閉 Modal
  };

  const handleDeleteEvent = (dayIndex, eventId) => {
    setItinerary(prevItinerary => {
      const newItinerary = [...prevItinerary];
      const day = newItinerary[dayIndex];
      // 確保使用正確的 eventId 刪除
      day.events = day.events.filter(e => e.id !== eventId); 
      return newItinerary;
    });
  };


  // --- Handlers for Packing Checklist (已修正儲存 ID 邏輯) ---
  const handleToggleCheck = (id) => {
    setPackingItems(prevItems => prevItems.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };
  
  const handleSavePackingItem = (updatedItem) => {
    const itemId = updatedItem.id || Date.now().toString(); // 確保新增時有 ID

    if (updatedItem.id) {
      setPackingItems(prevItems => prevItems.map(item => 
        item.id === updatedItem.id ? { ...updatedItem, id: itemId } : item // 編輯
      ));
    } else {
      const newItem = { 
        ...updatedItem, 
        id: itemId, // 新增
      };
      setPackingItems(prevItems => [...prevItems, newItem]);
    }
    setEditingChecklistItem(null); // 儲存後關閉 Modal
  };

  const handleDeletePackingItem = (idToDelete) => {
    setPackingItems(prevItems => prevItems.filter(item => item.id !== idToDelete));
  };


  // --- Handlers for Shopping List (已修正儲存 ID 邏輯) ---
  const handleToggleBought = (id) => {
    setShoppingItems(prevItems => prevItems.map(item => 
      item.id === id ? { ...item, bought: !item.bought } : item
    ));
  };
  
  const handleSaveShoppingItem = (updatedItem) => {
    const itemId = updatedItem.id || Date.now().toString(); // 確保新增時有 ID

    if (updatedItem.id) {
      setShoppingItems(prevItems => prevItems.map(item => 
        item.id === updatedItem.id ? { ...updatedItem, id: itemId } : item // 編輯
      ));
    } else {
      const newItem = { 
        ...updatedItem, 
        id: itemId, // 新增
      };
      setShoppingItems(prevItems => [...prevItems, newItem]);
    }
    setEditingShoppingItem(null); // 儲存後關閉 Modal
  };

  const handleDeleteShoppingItem = (idToDelete) => {
    setShoppingItems(prevItems => prevItems.filter(item => item.id !== idToDelete));
  };


  return (
    <div className="min-h-screen bg-[#FFF0F5] text-gray-800 font-sans pb-24 max-w-md mx-auto shadow-2xl overflow-hidden relative">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-400 to-rose-400 text-white p-6 rounded-b-[35px] shadow-lg relative overflow-hidden z-10">
        <div className="absolute top-[-20px] right-[-20px] opacity-20 rotate-12">
          <Heart size={150} fill="currentColor" />
        </div>
        <h1 className="text-2xl font-bold mb-1 tracking-wide">吉伊卡哇東京之旅</h1>
        <div className="flex items-center opacity-90 text-sm">
          <Plane size={14} className="mr-2"/> 
          <span>12/13 - 12/17</span>
          <span className="mx-2">|</span>
          <span>5 天 4 夜</span>
        </div>
      </div>

      <div className="p-5">
        
        {/* Weather - Visible on Itinerary tab */}
        {activeTab === 'itinerary' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm mb-6 border border-rose-100">
            <h3 className="text-rose-500 font-bold mb-3 flex items-center text-sm">
              <CloudSun className="mr-2" size={18}/> 12月中旬預報
            </h3>
            <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-hide">
              {WEATHER_FORECAST.map((day, idx) => {
                const IconComp = IconMap[day.icon];
                return (
                  <div key={idx} className="flex-shrink-0 flex flex-col items-center min-w-[70px] p-2 bg-rose-50 rounded-xl">
                    <span className="text-[10px] text-gray-500 font-medium mb-1">{day.date}</span>
                    <div className="my-1">{IconComp ? <IconComp className="w-6 h-6 text-orange-400" /> : null}</div>
                    <span className="text-xs font-bold text-gray-700">{day.temp}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab Content: Itinerary */}
        {activeTab === 'itinerary' && (
          <div className="space-y-4">
            {itinerary.map((day, dayIndex) => {
              const isExpanded = dayIndex === expandedDayIndex;
              return (
              <div key={dayIndex} className="transition-all duration-300">
                {/* Day Header */}
                <div 
                  onClick={() => handleToggleDay(dayIndex)}
                  className={`p-4 rounded-2xl cursor-pointer flex justify-between items-center transition-all shadow-md border ${isExpanded ? 'bg-white border-rose-200 ring-2 ring-rose-100' : 'bg-white hover:bg-rose-50 border-gray-100'}`}
                >
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0 ${isExpanded ? 'bg-rose-500 text-white' : 'bg-rose-100 text-rose-500'}`}>
                      {day.day.split(' ')[1]}
                    </div>
                    
                    {/* --- 每日標題編輯功能 --- */}
                    <div className="flex-grow min-w-0">
                      <div className="text-xs text-gray-400 font-bold">{day.date}</div>
                      
                      {editingDayTitleIndex === dayIndex ? (
                          <div className="flex items-center space-x-2 mt-1" onClick={(e) => e.stopPropagation()}>
                              <input
                                  value={currentDayTitle}
                                  onChange={(e) => setCurrentDayTitle(e.target.value)}
                                  className="font-bold text-gray-800 p-1 -ml-1 border-b border-rose-500 bg-transparent focus:outline-none w-full"
                                  onKeyPress={(e) => {
                                      if (e.key === 'Enter') handleSaveDayTitle(dayIndex);
                                  }}
                                  autoFocus
                              />
                              <button 
                                  onClick={(e) => { e.stopPropagation(); handleSaveDayTitle(dayIndex); }}
                                  className="text-rose-500 hover:text-rose-700 p-1 rounded-full transition-colors flex-shrink-0"
                                  title="儲存標題"
                              >
                                  <Save size={16} />
                              </button>
                              <button 
                                  onClick={(e) => { e.stopPropagation(); setEditingDayTitleIndex(null); }}
                                  className="text-gray-400 hover:text-gray-600 p-1 rounded-full transition-colors flex-shrink-0"
                                  title="取消編輯"
                              >
                                  <X size={16} />
                              </button>
                          </div>
                      ) : (
                          <div className="flex items-center space-x-2">
                              <div className="font-bold text-gray-800 text-sm truncate">{day.title}</div>
                              <button 
                                  onClick={(e) => { 
                                      e.stopPropagation(); // 阻止展開/收合
                                      handleStartEditTitle(dayIndex, day.title);
                                  }}
                                  className="text-gray-300 hover:text-rose-500 transition-colors p-1 flex-shrink-0"
                                  title="編輯當日標題"
                              >
                                  <Edit2 size={14} />
                              </button>
                          </div>
                      )}
                    </div>
                    {/* --- 結束：每日標題編輯功能 --- */}
                  </div>
                  <ArrowRight size={18} className={`text-gray-300 transition-transform ${isExpanded ? 'rotate-90 text-rose-500' : ''}`}/>
                </div>

                {/* Day Events Content */}
                {isExpanded && (
                  <div className="mt-4 pl-4 border-l-2 border-rose-200 space-y-6 animate-fadeIn pb-2">
                    {day.events.map((event) => (
                      <ItineraryEvent 
                        key={event.id} 
                        event={event} 
                        dayIndex={dayIndex}
                        onEdit={(event, dayIndex) => setEditingItineraryEvent({ ...event, dayIndex })} 
                      />
                    ))}

                    {/* Add New Event Button */}
                    <button 
                        // 修復: 傳入一個空物件 {} 表示新增模式，讓 Modal 知道要開啟
                        onClick={() => setEditingItineraryEvent({ dayIndex })}
                        className="w-full mt-4 flex items-center justify-center p-3 text-sm font-bold text-rose-500 border-2 border-dashed border-rose-200 rounded-xl bg-rose-50/50 hover:bg-rose-100 transition-colors"
                    >
                        <Plus size={16} className="mr-2"/> 新增當日活動
                    </button>
                  </div>
                )}
              </div>
            )})}
          </div>
        )}


        {/* Tab Content: Checklist */}
        {activeTab === 'checklist' && (
          <PackingListView 
            packingItems={packingItems} 
            onToggle={handleToggleCheck}
            onSave={handleSavePackingItem}
            onDelete={handleDeletePackingItem}
            setEditingItem={setEditingChecklistItem}
          />
        )}

        {/* Tab Content: Shopping */}
        {activeTab === 'shopping' && (
          <ShoppingList 
            items={shoppingItems} 
            onToggleBought={handleToggleBought} 
            onSetEditingItem={setEditingShoppingItem} 
            onDeleteItem={handleDeleteShoppingItem}
          />
        )}

      </div>

      {/* Modals */}
      
      {/* Edit Modal for Checklist Items */}
      {editingChecklistItem && (
        <ChecklistEditorModal 
          // 傳遞 item 如果它有 id，否則傳 null (表示新增)
          item={editingChecklistItem?.id ? editingChecklistItem : null} 
          onClose={() => setEditingChecklistItem(null)} 
          onSave={handleSavePackingItem}
          onDelete={handleDeletePackingItem}
        />
      )}

      {/* Edit Modal for Itinerary Events */}
      {editingItineraryEvent && (
        <ItineraryEditorModal 
          // 傳遞 event 如果它有 id，否則傳 null (表示新增)
          event={editingItineraryEvent?.id ? editingItineraryEvent : null}
          dayIndex={editingItineraryEvent.dayIndex}
          onClose={() => setEditingItineraryEvent(null)}
          onSave={handleSaveEvent}
          onDelete={handleDeleteEvent}
        />
      )}

      {/* Edit Modal for Shopping Items */}
      {/* 修復: 只要 editingShoppingItem 存在 (truthy)，就開啟 Modal */}
      {editingShoppingItem && ( 
        <ShoppingEditorModal
          // 傳遞 item 如果它有 id，否則傳 null (表示新增)
          item={editingShoppingItem?.id ? editingShoppingItem : null} 
          onClose={() => setEditingShoppingItem(null)}
          onSave={handleSaveShoppingItem}
          onDelete={handleDeleteShoppingItem}
        />
      )}

      {/* Bottom Nav */}
      <div className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] flex justify-around p-3 pb-8 z-40">
        <button 
          onClick={() => setActiveTab('itinerary')}
          className={`flex flex-col items-center transition-all ${activeTab === 'itinerary' ? 'text-rose-500 scale-110' : 'text-gray-400'}`}
        >
          <MapPin className={`mb-1 ${activeTab === 'itinerary' ? 'fill-rose-100' : ''}`} />
          <span className="text-[10px] font-bold">行程</span>
        </button>
        <button 
          onClick={() => setActiveTab('checklist')}
          className={`flex flex-col items-center transition-all ${activeTab === 'checklist' ? 'text-pink-500 scale-110' : 'text-gray-400'}`}
        >
          <CheckSquare className={`mb-1 ${activeTab === 'checklist' ? 'fill-pink-100' : ''}`} />
          <span className="text-[10px] font-bold">清單</span>
        </button>
        <button 
          onClick={() => setActiveTab('shopping')}
          className={`flex flex-col items-center transition-all ${activeTab === 'shopping' ? 'text-pink-500 scale-110' : 'text-gray-400'}`}
        >
          <ShoppingBag className={`mb-1 ${activeTab === 'shopping' ? 'fill-pink-100' : ''}`} />
          <span className="text-[10px] font-bold">購物</span>
        </button>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
      `}</style>
    </div>
  );
}