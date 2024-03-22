QUEST_NEWBIE3_KIN = {
	title = 'IDS_PROPQUEST_INC_002744',
	character = 'MaFl_Newbie',
	end_character = 'MaFl_Newbie',
	start_requirements = {
		min_level = 75,
		max_level = 129,
		job = { 'JOB_KNIGHT', 'JOB_KNIGHT_MASTER', 'JOB_KNIGHT_HERO' },
		previous_quest = '',
	},
	rewards = {
		gold = 0,
		exp = 0,
		items = {
			{ id = 'II_SYS_SYS_EVE_BXMKNIGHT90', quantity = 1, sex = 'Male' },
			{ id = 'II_SYS_SYS_EVE_BXFKNIGHT90', quantity = 1, sex = 'Female' },
		},
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_EVE_NEWBIE03', quantity = 1, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_002745',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_002746',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_002747',
		},
		completed = {
			'IDS_PROPQUEST_INC_002748',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_002749',
		},
	}
}
