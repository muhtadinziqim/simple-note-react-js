import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { addDataToAPI, deleteDataAPI, getDataFromAPI, updateDataAPI } from '../../../config/redux/action';

class Dashboard extends Component {
    state = {
        title: '',
        note: '',
        date: '',
        txtButton: 'SIMPAN',
        noteId: ''
    }

    componentDidMount() {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const data = {
            userId: userData.uid
        }
        this.props.getNotes(data)
    }

    handleSaveNote = () => {
        const { title, note, date, txtButton } = this.state
        const { saveNote, updateNote } = this.props
        const userData = JSON.parse(localStorage.getItem('userData'));
        const data = {
            title: title,
            note: note,
            date: new Date().getTime(),
            userId: userData.uid
        }
        if (txtButton == "SIMPAN") {
            saveNote(data);
        }else{
            data.noteId = this.state.noteId
            updateNote(data);
        }
        console.log("Data", data);
    }

    onInputChange = (e, type) => {
        this.setState({
            [type]: e.target.value
        })
    }

    handleUpdateNote = (note) => {
        console.log("Edit ", note);
        this.setState({
            title: note.data.title,
            date: note.data.date,
            note: note.data.note,
            txtButton: 'UPDATE',
            noteId: note.id
        })
    }

    handleCancelBtn = () => {
        this.setState({
            title: '',
            note: '',
            date: '',
            txtButton: 'SIMPAN'
        })
    }

    handleDelete = (e, note) => {
        e.stopPropagation();
        const userData = JSON.parse(localStorage.getItem('userData'));
        const data = {
            userId: userData.uid,
            noteId: note.id
        }
        this.props.deleteNote(data); 
    }

    render() {
        const { title, note, date } = this.state

        // console.log("Data L:", this.props.notes);
        return (
            <div>
                <div>
                    <input placeholder="Judul" value={title} onChange={(e) => this.onInputChange(e, 'title')} />
                    <textarea value={note} placeholder="Konten" onChange={(e) => this.onInputChange(e, 'note')}>{note}</textarea>
                    <button onClick={this.handleSaveNote}>{this.state.txtButton}</button>
                    <button onClick={this.handleCancelBtn}>CANCEL</button>
                </div>
                <hr />
                {
                    this.props.notes.length > 0 ? (
                        <Fragment>
                            {
                                this.props.notes.map(note => {
                                    return (
                                        <div key={note.id} onClick={() => this.handleUpdateNote(note)}>
                                            <div>{note.data.title}</div>
                                            <div>{note.data.date}</div>
                                            <div>{note.data.note}</div>
                                            <button onClick={(e) => this.handleDelete(e, note)}>Hapus</button>
                                            <hr></hr>
                                        </div>
                                    )
                                })
                            }
                        </Fragment>
                    ) : null
                }
            </div>
        )
    }
}

const reduxState = (state) => ({
    userData: state.user,
    notes: state.notes
})

const reduxDispatch = (dispatch) => ({
    saveNote: (data) => dispatch(addDataToAPI(data)),
    getNotes: (data) => dispatch(getDataFromAPI(data)),
    updateNote: (data) => dispatch(updateDataAPI(data)),
    deleteNote: (data) => dispatch(deleteDataAPI(data))
})

export default connect(reduxState, reduxDispatch)(Dashboard);