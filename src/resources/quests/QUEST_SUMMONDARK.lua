QUEST_SUMMONDARK = {
	title = 'IDS_PROPQUEST_INC_001710',
	character = 'MaFl_DrEstly',
	end_character = 'MaFl_DrEstly',
	start_requirements = {
		min_level = 20,
		max_level = 35,
		job = { 'JOB_MERCENARY', 'JOB_ACROBAT', 'JOB_ASSIST', 'JOB_MAGICIAN' },
		previous_quest = '',
	},
	rewards = {
		gold = 0,
		exp = 1031,
	},
	end_conditions = {
		patrols = {
			{ map = 'WI_WORLD_MADRIGAL', left = 7609, top = 4283, right = 7625, bottom = 4265 },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_001711',
			'IDS_PROPQUEST_INC_001712',
			'IDS_PROPQUEST_INC_001713',
			'IDS_PROPQUEST_INC_001714',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_001715',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_001716',
		},
		completed = {
			'IDS_PROPQUEST_INC_001717',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_001718',
		},
	}
}
