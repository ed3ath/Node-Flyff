QUEST_NEWBIE2_ACR = {
	title = 'IDS_PROPQUEST_INC_002712',
	character = 'MaFl_Newbie',
	end_character = 'MaFl_Newbie',
	start_requirements = {
		min_level = 30,
		max_level = 129,
		job = { 'JOB_ACROBAT', 'JOB_JESTER', 'JOB_RANGER', 'JOB_JESTER_MASTER', 'JOB_RANGER_MASTER', 'JOB_JESTER_HERO', 'JOB_RANGER_HERO' },
		previous_quest = '',
	},
	rewards = {
		gold = 0,
		exp = 0,
		items = {
			{ id = 'II_SYS_SYS_EVE_BXMACROBAT45', quantity = 1, sex = 'Male' },
			{ id = 'II_SYS_SYS_EVE_BXFACROBAT45', quantity = 1, sex = 'Female' },
		},
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_EVE_NEWBIE02', quantity = 1, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_002713',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_002714',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_002715',
		},
		completed = {
			'IDS_PROPQUEST_INC_002716',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_002717',
		},
	}
}
