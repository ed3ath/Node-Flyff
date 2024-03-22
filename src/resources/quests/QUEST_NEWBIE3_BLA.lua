QUEST_NEWBIE3_BLA = {
	title = 'IDS_PROPQUEST_INC_002736',
	character = 'MaFl_Newbie',
	end_character = 'MaFl_Newbie',
	start_requirements = {
		min_level = 75,
		max_level = 129,
		job = { 'JOB_BLADE', 'JOB_BLADE_MASTER', 'JOB_BLADE_HERO' },
		previous_quest = '',
	},
	rewards = {
		gold = 0,
		exp = 0,
		items = {
			{ id = 'II_SYS_SYS_EVE_BXMBLADE90', quantity = 1, sex = 'Male' },
			{ id = 'II_SYS_SYS_EVE_BXFBLADE90', quantity = 1, sex = 'Female' },
		},
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_EVE_NEWBIE03', quantity = 1, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_002737',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_002738',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_002739',
		},
		completed = {
			'IDS_PROPQUEST_INC_002740',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_002741',
		},
	}
}
