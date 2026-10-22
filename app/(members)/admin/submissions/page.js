import { getDb } from '../../../../lib/supabase'

export default async function Submissions() {
  const db = getDb()
  const { data } = db ? await db.from('form_submissions').select('*').order('created_at', { ascending: false }).limit(200) : { data: [] }
  return (
    <>
      <h2>Contact form submissions</h2>
      <table className="data-table">
        <thead><tr><th>Date</th><th>Name</th><th>Contact</th><th>Interest</th><th>Message</th></tr></thead>
        <tbody>
          {(data ?? []).map(s => (
            <tr key={s.id}>
              <td>{new Date(s.created_at).toLocaleDateString('en-US')}</td>
              <td>{s.name}</td>
              <td>{s.email}<br /><small>{s.phone}</small></td>
              <td>{s.interest}</td>
              <td style={{ whiteSpace: 'pre-line' }}>{s.message}</td>
            </tr>
          ))}
          {(data ?? []).length === 0 && <tr><td colSpan="5">No submissions yet.</td></tr>}
        </tbody>
      </table>
    </>
  )
}
