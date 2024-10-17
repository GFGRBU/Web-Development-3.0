from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

tasks = []

@app.route('/')
def index():
    return render_template('index.html', tasks=tasks)

@app.route('/add', methods=['POST'])
def add_task():
    task_content = request.form.get('task')
    if task_content:
        tasks.append({'content': task_content, 'completed': False})
    return redirect(url_for('index'))

@app.route('/complete/<int:task_id>')
def complete_task(task_id):
    tasks[task_id]['completed'] = not tasks[task_id]['completed']
    return redirect(url_for('index'))

@app.route('/delete/<int:task_id>')
def delete_task(task_id):
    tasks.pop(task_id)
    return redirect(url_for('index'))

@app.route('/edit/<int:task_id>', methods=['GET', 'POST'])
def edit_task(task_id):
    if request.method == 'POST':
        new_content = request.form.get('task')
        if new_content:
            tasks[task_id]['content'] = new_content
        return redirect(url_for('index'))
    
    task_content = tasks[task_id]['content']
    return render_template('edit.html', task_content=task_content, task_id=task_id)

if __name__ == '__main__':
    app.run(debug=True)