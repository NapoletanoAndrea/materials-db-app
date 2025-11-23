import re
from datetime import datetime


def srt_time_difference(srt_line):
    """
    Calculates the difference in seconds between start and end times in an SRT line.

    Args:
        srt_line (str): e.g., "00:00:26,090 --> 00:00:29,400"

    Returns:
        float: Duration in seconds
    """
    try:
        # Split the SRT line
        srt_line = srt_line.replace('\n', '')
        start_str, end_str = srt_line.split(' --> ')

        # Define the time format
        time_format = "%H:%M:%S,%f"

        # Parse strings into datetime objects
        start_time = datetime.strptime(start_str, time_format)
        end_time = datetime.strptime(end_str, time_format)

        # Calculate difference
        delta = end_time - start_time

        # Return difference in seconds
        return delta.total_seconds()
    except:
        return 0


# print(srt_time_difference("00:00:26,090 --> 00:00:29,400\n"))
# extract_timeframe("00:00:26,090 --> 00:00:29,400")


file = "C:/Users/Andrea/Desktop/AoT/S2/12.srt"
# output = "C:/Users/Andrea/Desktop/AoT/S2 Subs/1/cleaned_renumbered.srt"

# Read SRT and split into blocks
with open(file, encoding="utf-8") as f:
    content = f.readlines()

final_list = []
for idx, line in enumerate(content):
    # if (idx == 1):
    #     print(srt_time_difference(line))
    if line.startswith('<'):
        if 'an7}' in line or 'an8}' in line or '{=14}' in line:
            # print(line)
            pass
        else:
            final_list.append(content[idx - 2])
            final_list.append(content[idx - 1])
            final_list.append(line)
            final_list.append('\n')

print(len(final_list))

# Write the final list to a new file
with open(file, "w", encoding="utf-8") as f_out:
    f_out.writelines(final_list)

print(f"Saved {len(final_list)} lines to {file}")
