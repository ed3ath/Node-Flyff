QUEST_NEWBIE3_JST = {
	title = 'IDS_PROPQUEST_INC_002768',
	character = 'MaFl_Newbie',
	end_character = 'MaFl_Newbie',
	start_requirements = {
		min_level = 75,
		max_level = 129,
		job = { 'JOB_JESTER', 'JOB_JESTER_MASTER', 'JOB_JESTER_HERO' },
		previous_quest = '',
	},
	rewards = {
		gold = 0,
		exp = 0,
		items = {
			{ id = 'II_SYS_SYS_EVE_BXMJESTER90', quantity = 1, sex = 'Male' },
			{ id = 'II_SYS_SYS_EVE_BXFJESTER90', quantity = 1, sex = 'Female' },
		},
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_EVE_NEWBIE03', quantity = 1, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_002769',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_002770',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_002771',
		},
		completed = {
			'IDS_PROPQUEST_INC_002772',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_002773',
		},
	}
}
