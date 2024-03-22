QUEST_NEWBIE2_MER = {
	title = 'IDS_PROPQUEST_INC_002696',
	character = 'MaFl_Newbie',
	end_character = 'MaFl_Newbie',
	start_requirements = {
		min_level = 30,
		max_level = 129,
		job = { 'JOB_MERCENARY', 'JOB_KNIGHT', 'JOB_BLADE', 'JOB_KNIGHT_MASTER', 'JOB_BLADE_MASTER', 'JOB_KNIGHT_HERO', 'JOB_BLADE_HERO' },
		previous_quest = '',
	},
	rewards = {
		gold = 0,
		exp = 0,
		items = {
			{ id = 'II_SYS_SYS_EVE_BXMMERCENARY45', quantity = 1, sex = 'Male' },
			{ id = 'II_SYS_SYS_EVE_BXFMERCENARY45', quantity = 1, sex = 'Female' },
		},
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_EVE_NEWBIE02', quantity = 1, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_002697',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_002698',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_002699',
		},
		completed = {
			'IDS_PROPQUEST_INC_002700',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_002701',
		},
	}
}
