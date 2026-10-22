import { getDb } from '../../../../lib/supabase'
import { addResource, deleteResource, addVideo, deleteVideo } from '../actions'

const SECTIONS = [
  ['quick', 'Top buttons (Getting Started, OH Dibs...)'],
  ['links', 'Resource Links'],
  ['coaching', 'Coaching'],
  ['marketing', 'Marketing & Advertising'],
  ['services', 'Our Services'],
]

const Del = ({ action, id }) => (
  <form action={action}>
    <input type="hidden" name="id" value={id} />
    <button className="slot-btn slot-btn-cancel">Delete</button>
  </form>
)

export default async function AdminContent() {
  const db = getDb()
  const [{ data: resources }, { data: videos }] = db ? await Promise.all([
    db.from('resources').select('*').order('section').order('sort').order('title'),
    db.from('videos').select('*').order('category').order('created_at', { ascending: false }),
  ]) : [{ data: [] }, { data: [] }]

  return (
    <>
      <h2>Add link</h2>
      <form action={addResource} className="admin-form">
        <select className="form-input form-select" name="section">
          {SECTIONS.map(([k, l]) => <option key={k} value={k}>{l}</option>)}
        </select>
        <input className="form-input" name="title" placeholder="Title *" required />
        <input className="form-input" name="url" placeholder="https://... or /path *" required />
        <input className="form-input" name="description" placeholder="Short description" />
        <input className="form-input" type="number" name="sort" placeholder="Order (0 first)" />
        <button className="btn btn-red" type="submit">Add</button>
      </form>
      <table className="data-table">
        <thead><tr><th>Section</th><th>Title</th><th>URL</th><th /></tr></thead>
        <tbody>
          {(resources ?? []).map(r => (
            <tr key={r.id}><td>{r.section}</td><td>{r.title}</td><td>{r.url}</td><td className="admin-actions"><Del action={deleteResource} id={r.id} /></td></tr>
          ))}
        </tbody>
      </table>

      <h2>Add video</h2>
      <form action={addVideo} className="admin-form">
        <input className="form-input" name="category" placeholder="Category (Compliance Tips, Team Meetings, Classes) *" list="cats" required />
        <datalist id="cats"><option>Compliance Tips</option><option>Team Meetings</option><option>Classes</option></datalist>
        <input className="form-input" name="title" placeholder="Title *" required />
        <input className="form-input" name="url" placeholder="YouTube URL *" required />
        <button className="btn btn-red" type="submit">Add</button>
      </form>
      <table className="data-table">
        <thead><tr><th>Category</th><th>Title</th><th>URL</th><th /></tr></thead>
        <tbody>
          {(videos ?? []).map(v => (
            <tr key={v.id}><td>{v.category}</td><td>{v.title}</td><td>{v.youtube_url}</td><td className="admin-actions"><Del action={deleteVideo} id={v.id} /></td></tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
