from flask import Flask, request, jsonify

app = Flask(__name__)

notifications = []

@app.route("/notify", methods=["POST"])
def send_notification():
    data = request.get_json()
    notifications.append({"message": data.get("message")})
    return jsonify({"status": "sent", "message": data.get("message")}), 200

@app.route("/notifications", methods=["GET"])
def get_notifications():
    return jsonify(notifications), 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)
