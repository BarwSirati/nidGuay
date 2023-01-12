#!/bin/bash
discord_url="https://discordapp.com/api/webhooks/1063101954403876954/shBizhj_Dm4UkLz3hJ2keOPbJ9eHT1XAFyGWwLs04MGsjq-bEET7iekhC40_pBvNqVb3"

generate_post_data() {
  cat <<EOF
{
  "content": "Hello! World!",
  "embeds": [{
    "title": "Preview [Frontend]",
    "url": "https://nidguay.bxdman.com",
    "color": "655172"
  }]
}
EOF
}


# POST request to Discord Webhook
curl -H "Content-Type: application/json" -X POST -d "$(generate_post_data)" $discord_url
@BarwSirati
 
