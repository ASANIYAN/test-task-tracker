import Board from '@/component/board/board'
import Card from '@/component/card/card'
import Image from 'next/image'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  return (
    <>
      <ToastContainer />
      <main className="py-5 px-3">
          <Board />
      </main>
    </>
  )
}
