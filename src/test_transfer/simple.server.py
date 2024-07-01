from flask import Flask, request, jsonify
import os

app = Flask(__name__)

@app.route('/receiver/urn:connector:provider/callback', methods=['POST'])
def receive_file():
    if not request.data:
        return "No data received", 400

    # Define the absolute path to the Desktop directory
    desktop_path = os.path.expanduser("~/Desktop")
    file_path = os.path.join(desktop_path, "final_file.txt")

    # Ensure the Desktop directory exists
    if not os.path.exists(desktop_path):
        return "Desktop directory does not exist", 500

    # Save the received data to the final_file.txt on the Desktop
    try:
        with open(file_path, "wb") as file:
            file.write(request.data)
    except Exception as e:
        return f"Error saving file: {str(e)}", 500

    return jsonify({"message": "File received"}), 200

if __name__ == '__main__':
    app.run(port=4000)
