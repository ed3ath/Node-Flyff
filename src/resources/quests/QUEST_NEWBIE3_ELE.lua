QUEST_NEWBIE3_ELE = {
	title = 'IDS_PROPQUEST_INC_002752',
	character = 'MaFl_Newbie',
	end_character = 'MaFl_Newbie',
	start_requirements = {
		min_level = 75,
		max_level = 129,
		job = { 'JOB_ELEMENTOR', 'JOB_ELEMENTOR_MASTER', 'JOB_ELEMENTOR_HERO' },
		previous_quest = '',
	},
	rewards = {
		gold = 0,
		exp = 0,
		items = {
			{ id = 'II_SYS_SYS_EVE_BXMELEMENTOR90', quantity = 1, sex = 'Male' },
			{ id = 'II_SYS_SYS_EVE_BXFELEMENTOR90', quantity = 1, sex = 'Female' },
		},
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_EVE_NEWBIE03', quantity = 1, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_002753',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_002754',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_002755',
		},
		completed = {
			'IDS_PROPQUEST_INC_002756',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_002757',
		},
	}
}
